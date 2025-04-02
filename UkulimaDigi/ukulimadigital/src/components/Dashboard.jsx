import React, { useState, useEffect } from "react";
import "./App.css";
import "./weather.css";
import CropManagement from "./crop"; 
import ToDo from "./tasks";
import WeatherWidget from "./weather";
import CropDiseaseDetector from "./cropdiseasedetector";
import logo from "./logo.png"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCrops: 0,
    totalSales: 0,
    toDoTasks: [],
  });

  useEffect(() => {
    
    setStats((prevStats) => ({
      ...prevStats,
      totalCrops: 2,
      totalSales: 5000,
    }));
  }, []);

  const updateToDoTasks = (tasks) => {
    setStats((prevStats) => ({ ...prevStats, toDoTasks: tasks }));
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">  UkulimaDigi</div>
        <nav className="nav-link">
          <a href="#">Dashboard</a>
          <a href="#">Products</a>
          <a href="#">Orders</a>
          <a href="#">Analytics</a>
          <a href="#">Settings</a>
        </nav>
     
      <div className="profile-section">
        <div className="profile-icon">TM</div>
        <div className="profile-info">
          <p className="profile-name">Tracy Mugure</p>
          <p className="profile-subtext">Home Farm</p>
        </div>
      </div>
      </div>
      {/* Main Content */}
      <div className="main-content">
        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-card">
            <h3>Total Crops</h3>
            <p className="stat-value">{stats.totalCrops}</p>
            <p className="stat-sub">+2 from last month</p>
          </div>
        
          <div className="stat-card">
            <h3>To do list</h3>
            <p className="stat-value">{stats.toDoTasks.length} pending tasks</p> 
          </div>
          <div className="stat-card">
            <h3>Total Sales</h3>
            <p className="stat-value">{stats.totalSales}</p>
            <p className="stat-sub">+3% this week</p>
          </div>
        </section>

        {/* Crop Management Section */}
        <section className="main-section">
          <CropManagement />
          <div className="dashboard-widgets">
            <WeatherWidget/>
            <ToDo updateToDoTasks={updateToDoTasks} />
            <CropDiseaseDetector />
          </div>
        </section>

        {/* Footer */}
        
      </div>
    </div>
  );
};

export default Dashboard;
