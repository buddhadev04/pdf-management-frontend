import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { uploadFile } from '../services/apiService';
import '../styles.css';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('Schematics');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const categories = [
    'Schematics', 'BoardViews', 'SPI Bios', 'T2 Bios', 'Usb -C Bios', 
    'Impedance DV / G.R Value', 'Case Study', 'Digital Oscilloscope', 
    'Images', 'Videos'
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    try {
      const data = await uploadFile(file, category);
      setSuccessMessage(`File "${data.name}" uploaded to "${data.category}" successfully!`);
      setFile(null);
    } catch (error) {
      alert(`Failed to upload file: ${error.message}`);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Upload your files here</p>
      </div>
      <div className="dashboard-content">
        <div
          className={`upload-card ${file ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h3 className="upload-title">Upload File</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="category-select"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <label className="upload-label">
              Choose File
              <input
                type="file"
                onChange={handleFileChange}
                className="upload-input"
              />
            </label>
            <p className="drop-text">or drag and drop your file here</p>
            <button type="submit" className="upload-button">
              Upload
            </button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {file && <p className="success-message">Selected: {file.name}</p>}
        </div>
        <button
          className="view-pdfs-button"
          onClick={() => navigate('/view-pdf/all')}
        >
          View Uploaded Files
        </button>
      </div>
    </div>
  );
};

export default Dashboard;