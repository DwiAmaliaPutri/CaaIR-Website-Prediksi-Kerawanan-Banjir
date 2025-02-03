import React, { useState } from "react";
import axios from "axios";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    curah_hujan: "",
    "Jenis Tanah": "",
    "Penggunaan Lahan": "",
  });
  const [result, setResult] = useState(null);
  const [theme, setTheme] = useState("light"); // Light or Dark mode

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult({ error: "Something went wrong!" });
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: theme === "dark" ? "#333" : "#f9f9f9",
      color: theme === "dark" ? "#f5f5f5" : "#333",
      fontFamily: "Arial, sans-serif",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "8px",
      boxSizing: "border-box",
      borderRadius: "4px",
      border: "1px solid #ccc",
      backgroundColor: theme === "dark" ? "#555" : "#fff",
      color: theme === "dark" ? "#f5f5f5" : "#333",
    },
    select: {
      width: "100%",
      padding: "8px",
      boxSizing: "border-box",
      borderRadius: "4px",
      border: "1px solid #ccc",
      backgroundColor: theme === "dark" ? "#555" : "#fff",
      color: theme === "dark" ? "#f5f5f5" : "#333",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    resultContainer: {
      marginTop: "20px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: theme === "dark" ? "#444" : "#fff",
      color: theme === "dark" ? "#f5f5f5" : "#333",
    },
    toggleButton: {
      marginBottom: "15px",
      padding: "8px 15px",
      backgroundColor: theme === "dark" ? "#555" : "#ddd",
      color: theme === "dark" ? "#f5f5f5" : "#333",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.toggleButton} onClick={toggleTheme}>
        Toggle to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <h2>Data Prediksi</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Curah Hujan:</label>
          <input
            type="number"
            name="curah_hujan"
            value={formData.curah_hujan}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Jenis Tanah:</label>
          <select
            name="Jenis Tanah"
            value={formData["Jenis Tanah"]}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Pilih</option>
            <option value="Regosol">Regosol</option>
            <option value="Litosol">Litosol</option>
            <option value="Andosol">Andosol</option>
            <option value="Grumusol">Grumusol</option>
            <option value="Latosol">Latosol</option>
            <option value="Aluvial">Aluvial</option>
            <option value="Podsolik">Podsolik</option>
            <option value="Clay">Clay</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Penggunaan Lahan:</label>
          <select
            name="Penggunaan Lahan"
            value={formData["Penggunaan Lahan"]}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Pilih</option>
            <option value="Badan Air">Badan Air</option>
            <option value="Gedung/Bangunan">Gedung/Bangunan</option>
            <option value="Hutan">Hutan</option>
            <option value="Pekebunan/Kebun">Pekebunan/Kebun</option>
            <option value="Permukiman">Permukiman</option>
            <option value="Sawah">Sawah</option>
            <option value="Sawah Tadah Hujan">Sawah Tadah Hujan</option>
            <option value="Semak Belukar">Semak Belukar</option>
            <option value="Tegalan/Ladang">Tegalan/Ladang</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(theme === "dark" && styles.buttonHover),
          }}
        >
          Predict
        </button>
      </form>
      {result && (
        <div style={styles.resultContainer}>
          <h2>Hasil Prediksi:</h2>
          {result.error ? (
            <p>Error: {result.error}</p>
          ) : (
            <div>
              <p>Prediction: {result.prediction}</p>
              <p>Probabilities:</p>
              <ul>
                <li>Rendah: {result.probabilities.prediction_score_Rendah}</li>
                <li>Sedang: {result.probabilities.prediction_score_Sedang}</li>
                <li>Tinggi: {result.probabilities.prediction_score_Tinggi}</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
