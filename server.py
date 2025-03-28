from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import base64
from dotenv import load_dotenv

# Loading the environment variables
load_dotenv()
API_KEY = os.getenv("PLANT_ID_API_KEY") or "GX9bL5qkAbZdRHC3fZEjltoPj0nGu1OuMWs8uwep960EbIfxKd"

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

PLANT_ID_URL = "https://api.plant.id/v3/health_assessment"


def identify_plant(image_path):
    """Send an image to Plant.id for disease identification"""
    try:
        with open(image_path, "rb") as img_file:
            image_base64 = base64.b64encode(img_file.read()).decode("utf-8")

        headers = {
            "Content-Type": "application/json",
            "Api-Key": API_KEY  
        }

        payload = {
            "images": [image_base64],
            "health": "only",
            "similar_images": True
        }

        response = requests.post(PLANT_ID_URL, json=payload, headers=headers)
        print("📡 API Request Sent:", response.status_code, response.text)  

        if response.status_code == 200:
            result = response.json()
            print("🌱 API Response:", result)   

            # Extracting disease information
            disease_data = result.get("result", {}).get("disease", {}).get("suggestions", [])
            diseases = []
            
            for disease in disease_data:
                diseases.append({
                    "name": disease.get("name", "Unknown Disease"),
                    "probability": disease.get("probability", "Unknown"),
                    "similar_images": [img["url"] for img in disease.get("similar_images", [])]
                })

            if diseases:
                return {"status": "sick", "diseases": diseases}
            else:
                return {"status": "healthy", "message": "No diseases detected"}

        return {"error": "API request failed", "status_code": response.status_code, "details": response.text}

    except Exception as e:
        return {"error": str(e)}
    
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Send image to Plant.id API
    result = identify_plant(file_path)

    # Removing the uploaded file after processing
    os.remove(file_path)

    return jsonify(result), 201


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  
    app.run(host="0.0.0.0", port=port)