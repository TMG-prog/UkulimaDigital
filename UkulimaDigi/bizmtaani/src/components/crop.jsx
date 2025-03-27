import React, { useState } from "react";
import "./crop.css";

const CropManagement: React.FC = () => {
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Tomatoes",
      variety: "Red tomatoes",
      status: "Growing",
      plantDate: "Apr 15",
      harvestDate: "Jul 30",
      progress: 65,
      health: "Good",
      alerts: 0,
    },
    {
      id: 2,
      name: "Sukuma Wiki",
      variety: "Green",
      status: "Near Harvest",
      plantDate: "Oct 10",
      harvestDate: "Jul 5",
      progress: 92,
      health: "Excellent",
      alerts: 0,
    },
  ]);

  const [newCrop, setNewCrop] = useState({
    name: "",
    variety: "",
    status: "Planted",
    plantDate: "",
    harvestDate: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    setNewCrop({ ...newCrop, [e.target.name]: e.target.value });
  };

  // Function to add a new crop
  const addCrop = () => {
    if (!newCrop.name || !newCrop.variety || !newCrop.plantDate || !newCrop.harvestDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newCropData = {
      id: crops.length + 1,
      name: newCrop.name,
      variety: newCrop.variety,
      status: newCrop.status,
      plantDate: newCrop.plantDate,
      harvestDate: newCrop.harvestDate,
      progress: 0,
      health: "Good",
      alerts: 0,
    };

    setCrops([...crops, newCropData]); // Add new crop
    setNewCrop({ name: "", variety: "", status: "Planted", plantDate: "", harvestDate: "" }); // Reset form
    setIsModalOpen(false); // Close modal
  };

  // Function to remove the last crop
  const removeCrop = () => {
    if (crops.length > 0) {
      setCrops(crops.slice(0, -1));
    }
  };

  return (
    <div className="container">
      <h2>In the Farm</h2>
      <p className="subheading">{crops.length} Crops</p>

      {/* Crop list */}
      {crops.map((crop) => (
        <div key={crop.id} className="crop-card">
          <div className="header">
            <div>
              <h3>{crop.name}</h3>
              <p className="variety">{crop.variety}</p>
            </div>
            <span className={`status ${crop.status.toLowerCase().replace(" ", "-")}`}>
              {crop.status}
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${crop.progress}%` }}></div>
          </div>
          <div className="details">
            <span className={`health ${crop.health.toLowerCase()}`}>
              {crop.alerts > 0 ? "⚠️ " : ""}Health: {crop.health}
            </span>
            <span>Growth: {crop.progress}%</span>
          </div>
          <div className="dates">
            <p>📅 Planted: {crop.plantDate}</p>
            <p>📅 Harvest: {crop.harvestDate}</p>
          </div>
        </div>
      ))}

      {/* Buttons */}
      <button className="addbtn" onClick={() => setIsModalOpen(true)}>Add Crop</button>
      <button className="subbtn" onClick={removeCrop} disabled={crops.length === 0}>
        Remove Last Crop
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Crop</h3>
            <input
              type="text"
              name="name"
              placeholder="Crop Name"
              value={newCrop.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="variety"
              placeholder="Variety"
              value={newCrop.variety}
              onChange={handleInputChange}
            />
            <select name="status" value={newCrop.status} onChange={handleInputChange}>
              <option value="Planted">Planted</option>
              <option value="Growing">Growing</option>
              <option value="Near Harvest">Near Harvest</option>
              <option value="Harvested">Harvested</option>
            </select>
            <input
              type="date"
              name="plantDate"
              value={newCrop.plantDate}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="harvestDate"
              value={newCrop.harvestDate}
              onChange={handleInputChange}
            />
            <div className="modal-buttons">
              <button onClick={addCrop}>Save Crop</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropManagement;
