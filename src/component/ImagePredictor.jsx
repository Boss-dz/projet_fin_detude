import { useState } from "react";
import { predictDisease } from "../api.js";

export default function ImagePredictor() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handlePredict = async () => {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    try {
      const prediction = await predictDisease(file);
      setResult(prediction);
    } catch (err) {
      console.error(err);
      alert("Error while predicting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-predictor">
      <div className="upload-section">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <div className="preview">
            <img src={preview} alt="preview" />
          </div>
        )}
      </div>

      <button
        onClick={handlePredict}
        disabled={loading}
        className="predict-btn"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {result && (
        <div className="result-box">
          <h3>Prediction Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
