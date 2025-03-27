import React, { useState } from "react";
import { FaCloudUploadAlt, FaSearch } from "react-icons/fa";
import "./cropdisease.css"; 
import diseaseSolutions from "./solutiondisease";

const CropDiseaseDetector = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disease, setDisease] = useState("");
  const [solution, setSolution] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }
  
    setLoading(true);
    setDisease("");
    setSolution("");
  
    const formData = new FormData();
    formData.append("file", image);
  
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });
  
      const rawData = await response.json();
      console.log("📡 Raw API Response:", rawData); // Debugging
  
      // Ensure "details" field is parsed correctly
      let data;
      try {
        data = JSON.parse(rawData.details); // Convert stringified JSON to an object
      } catch (err) {
        console.error(" Failed to parse details:", err);
        setDisease("Error processing API response");
        setSolution("Try again later.");
        return;
      }
  
      console.log("✅ Parsed API Data:", data); // Debugging
  
      // Extract disease information correctly
      if (data.result?.disease?.suggestions?.length > 0) {
        const topDisease = data.result.disease.suggestions[0];
        const detectedDisease = topDisease.name || "Unknown Disease";
        
        setDisease(detectedDisease);
  
        // Get solution from imported file
        const suggestedSolution = diseaseSolutions[detectedDisease] || 
          "No specific solution found. Consult an expert for treatment.";
  
        setSolution(suggestedSolution);
      } else {
        setDisease("No disease detected");
        setSolution("Plant seems healthy.");
      }
    } catch (error) {
      console.error(" API Request Failed:", error);
      alert("Error processing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
return (
  <div className="crop-detector">
    <h3>Check Your Plant's Health</h3>
    <div className="upload-container">
      <label htmlFor="file-upload" className="upload-box">
        {preview ? (
          <img src={preview} alt="Crop Preview" className="preview-img" />
        ) : (
          <>
            <FaCloudUploadAlt className="upload-icon" />
            <p className="upload-text">Upload a plant image</p>
            <p className="upload-subtext">Drag & drop or click to browse</p>
            <button className="browse-btn">Browse Files</button>
          </>
        )}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        hidden
      />
    </div>

    <button onClick={handleUpload} disabled={loading} className="analyze-btn">
      <FaSearch /> {loading ? "Processing..." : "Analyze Plant"}
    </button>

    {disease && (
      <div className="result">
        <h3>Diagnosis:</h3>
        <p><strong>Disease:</strong> {disease}</p>
        <p><strong>Solution:</strong> {solution}</p>
      </div>
    )}
  </div>
);
};

export default CropDiseaseDetector;