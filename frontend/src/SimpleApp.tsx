import React, { useState } from "react";

const CropForm: React.FC = () => {
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

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Crop & Yield Prediction</h2>
      <form onSubmit={handleSubmit}>
        {["N", "P", "K", "temperature", "humidity", "ph", "rainfall"].map((field) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <label>{field.toUpperCase()}:</label>
            <input
              type="number"
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
        ))}

        <div style={{ marginBottom: "10px" }}>
          <label>Previous Crop:</label>
          <input
            type="text"
            name="previous_crop"
            value={formData.previous_crop}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ padding: "10px 20px" }}>
          {loading ? "Predicting..." : "Submit"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {result && (
        <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}>
          <h3>Prediction Result</h3>
          <p><strong>Crop:</strong> {result.predicted_crop}</p>
          <p><strong>Yield:</strong> {result.predicted_yield} tons/ha</p>
        </div>
      )}
    </div>
  );
};

export default CropForm;
