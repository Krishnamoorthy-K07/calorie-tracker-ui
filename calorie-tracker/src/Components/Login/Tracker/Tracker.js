import { useState } from "react";
import axios from "axios";
import "./Tracker.css";

function TrackerPage() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("jwtToken");

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
    setImageUrl(""); // Clear URL input when file is selected
  };

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
    setImage(null); // Clear file input when URL is entered
  };

  const handleUpload = async () => {
    setError("");
    setResult(null);

    if (!image && !imageUrl) {
      setError("⚠️ Please select an image file or enter an image URL.");
      return;
    }

    try {
      let response;

      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        response = await axios.post("https://calorie-tracker-backend-latest.onrender.com/tracker/analyze-food", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (imageUrl) {
        response = await axios.post(
          `https://calorie-tracker-backend-latest.onrender.com/tracker/analyze-food?imageUrl=${encodeURIComponent(imageUrl)}`,
          {}, // empty body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
      }

      setResult(response.data);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("❌ Upload failed. Please try again.");
    }
  };

  return (
    <div className="tracker-container">
      <h1>🍎 Food Calorie Tracker</h1>

      <div className="input-section">
        <label>📁 Upload Image File</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <label>🌐 Or Enter Image URL</label>
        <input type="text" value={imageUrl} onChange={handleUrlChange} placeholder="https://example.com/image.jpg" />

        <button onClick={handleUpload}>📸 Analyze</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {result && result.nutritionData && (
  <div className="result">
    <h2>📊 Analysis Result</h2>
    <p>{result.responseMessage}</p>
    <table>
      <thead>
        <tr>
          <th>🍽️ Food</th>
          <th>🔥 Calories</th>
          <th>💪 Protein (g)</th>
          <th>🥔 Carbs (g)</th>
          <th>🧈 Fat (g)</th>
          <th>🌿 Fiber (g)</th>
        </tr>
      </thead>
      <tbody>
        {result.nutritionData.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.calories}</td>
            <td>{item.protein}</td>
            <td>{item.carbs}</td>
            <td>{item.fat}</td>
            <td>{item.fiber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
}

export default TrackerPage;