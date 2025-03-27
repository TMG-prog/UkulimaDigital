from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import io

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Load the trained PyTorch model
MODEL_PATH = "plant-disease-model.pth"


model = models.resnet34(pretrained=False)  # Load ResNet-34 architecture
num_ftrs = model.fc.in_features
model.fc = torch.nn.Linear(num_ftrs, 38)  # Adjust for 38 plant disease classes

# Load trained weights
model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device("cpu")))
model.eval()  # Set to evaluation mode

# Define class labels (Replace with actual 38 class names)
CLASS_NAMES = [
    "Apple Scab", "Apple Black Rot", "Cedar Rust", "Healthy Apple",
    "Grape Black Rot", "Healthy Grape", "Potato Early Blight",
    "Potato Late Blight", "Healthy Potato", "Tomato Bacterial Spot",
    # ... (Add all 38 class names here)
]

# Define solutions for each disease
DISEASE_SOLUTIONS = {
    "Apple Scab": "Use fungicides like Captan. Prune infected leaves.",
    "Apple Black Rot": "Remove infected fruit, apply fungicide.",
    "Cedar Rust": "Use rust-resistant varieties. Apply fungicide early.",
    "Healthy Apple": "No action needed!",
    "Grape Black Rot": "Improve air circulation and use fungicide.",
    "Healthy Grape": "No action needed!",
    "Potato Early Blight": "Use copper-based fungicide.",
    "Potato Late Blight": "Apply metalaxyl-based fungicide.",
    "Healthy Potato": "No action needed!",
    "Tomato Bacterial Spot": "Use copper spray and rotate crops.",
    # ... (Add solutions for all 38 diseases)
}

# Image preprocessing (Matches the training process)
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])  # Standard ResNet normalization
])

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    image = Image.open(io.BytesIO(file.read())).convert("RGB")
    image = transform(image).unsqueeze(0)  # Add batch dimension

    with torch.no_grad():
        predictions = model(image)
        predicted_class = CLASS_NAMES[torch.argmax(predictions).item()]

    return jsonify({
        "disease": predicted_class,
        "solution": DISEASE_SOLUTIONS.get(predicted_class, "No solution available")
    })

if __name__ == "__main__":
    app.run(debug=True)