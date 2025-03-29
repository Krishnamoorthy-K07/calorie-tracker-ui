import { useState } from "react";
import axios from "axios";
import "./Tracker.css";

function TrackerPage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("YOUR_IMAGE_UPLOAD_ENDPOINT", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="tracker-container">
      <h1>🍎 Food Calorie Tracker</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>📸 Upload Image</button>
      {result && (
        <div className="result">
          <h2>📊 Analysis Result</h2>
          <p>{JSON.stringify(result, null, 2)}</p>
        </div>
      )}
    </div>
  );
}

export default TrackerPage;
