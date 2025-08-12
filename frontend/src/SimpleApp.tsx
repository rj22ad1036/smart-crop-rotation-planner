import React, { useState, useEffect } from "react";
import './style.css';

const SimpleApp: React.FC = () => {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
    previous_crop: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ predicted_crop: string; predicted_yield: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      // Default to system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Apply theme to document body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/api/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          N: Number(formData.N),
          P: Number(formData.P),
          K: Number(formData.K),
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          ph: Number(formData.ph),
          rainfall: Number(formData.rainfall),
          previous_crop: formData.previous_crop
        })
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fieldLabels = {
    N: { label: "Nitrogen (N)", unit: "kg/ha", icon: "🧪" },
    P: { label: "Phosphorus (P)", unit: "kg/ha", icon: "⚗️" },
    K: { label: "Potassium (K)", unit: "kg/ha", icon: "🔬" },
    temperature: { label: "Temperature", unit: "°C", icon: "🌡️" },
    humidity: { label: "Humidity", unit: "%", icon: "💧" },
    ph: { label: "pH Level", unit: "", icon: "🧮" },
    rainfall: { label: "Rainfall", unit: "mm", icon: "🌧️" }
  };

  return (
    <div className="app">
      {/* Header */}
      <nav className="navbar">
        <div className="nav-brand">
          <h2>🌱 Smart Crop Rotation Planner</h2>
        </div>
        <div className="nav-menu">
          <span>AI-Powered Agriculture</span>
          <button 
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <main className="main-content">
        <div className="page-content">
          {/* Hero Section */}
          <div className="hero-section">
            <h1>🌾 Crop & Yield Prediction</h1>
            <p className="hero-subtitle">
              Get AI-powered recommendations for optimal crop selection and yield estimation
            </p>
          </div>

          {/* Main Form Container */}
          <div className="prediction-container">
            <div className="form-section">
              <div className="section-header">
                <h3>📊 Soil & Environmental Data</h3>
                <p>Enter your field conditions for accurate predictions</p>
              </div>

              <form onSubmit={handleSubmit} className="prediction-form">
                {/* Soil Nutrients Grid */}
                <div className="form-group-section">
                  <h4>🌱 Soil Nutrients</h4>
                  <div className="form-grid">
                    {["N", "P", "K"].map((field) => (
                      <div key={field} className="form-group">
                        <label className="form-label">
                          <span className="label-icon">{fieldLabels[field as keyof typeof fieldLabels].icon}</span>
                          {fieldLabels[field as keyof typeof fieldLabels].label}
                          <span className="label-unit">({fieldLabels[field as keyof typeof fieldLabels].unit})</span>
                        </label>
                        <input
                          type="number"
                          name={field}
                          value={(formData as any)[field]}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder={`Enter ${field} value`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Environmental Conditions Grid */}
                <div className="form-group-section">
                  <h4>🌤️ Environmental Conditions</h4>
                  <div className="form-grid">
                    {["temperature", "humidity", "ph", "rainfall"].map((field) => (
                      <div key={field} className="form-group">
                        <label className="form-label">
                          <span className="label-icon">{fieldLabels[field as keyof typeof fieldLabels].icon}</span>
                          {fieldLabels[field as keyof typeof fieldLabels].label}
                          <span className="label-unit">({fieldLabels[field as keyof typeof fieldLabels].unit})</span>
                        </label>
                        <input
                          type="number"
                          step={field === "ph" ? "0.1" : "1"}
                          name={field}
                          value={(formData as any)[field]}
                          onChange={handleChange}
                          required
                          className="form-input"
                          placeholder={`Enter ${field} value`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Previous Crop */}
                <div className="form-group-section">
                  <h4>🌾 Crop History</h4>
                  <div className="form-group full-width">
                    <label className="form-label">
                      <span className="label-icon">📝</span>
                      Previous Crop
                    </label>
                    <input
                      type="text"
                      name="previous_crop"
                      value={formData.previous_crop}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="e.g., rice, wheat, corn, cotton, etc."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className={`btn btn-primary predict-btn ${loading ? 'loading' : ''}`}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        🚀 Get Prediction
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Results Section */}
            <div className="results-section">
              {error && (
                <div className="alert alert-error">
                  <div className="alert-icon">❌</div>
                  <div className="alert-content">
                    <h4>Prediction Failed</h4>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="alert alert-success">
                  <div className="alert-icon">✅</div>
                  <div className="alert-content">
                    <h4>Prediction Results</h4>
                    <div className="result-grid">
                      <div className="result-card">
                        <div className="result-icon">🌾</div>
                        <div className="result-info">
                          <h5>Recommended Crop</h5>
                          <p className="result-value">{result.predicted_crop}</p>
                        </div>
                      </div>
                      <div className="result-card">
                        <div className="result-icon">📊</div>
                        <div className="result-info">
                          <h5>Expected Yield</h5>
                          <p className="result-value">{result.predicted_yield} tons/ha</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimpleApp;