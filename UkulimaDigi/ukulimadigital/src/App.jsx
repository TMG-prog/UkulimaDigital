import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import LandingPage from './components/landingpage';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <BrowserRouter> {/* ✅ Use BrowserRouter */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;