import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function DashboardPemetaan({ darkMode }) {
  const [selectedArea, setSelectedArea] = useState("Semua Kecamatan");

  const handleSelectChange = (event) => {
    setSelectedArea(event.target.value);
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: darkMode ? "#2f3640" : "#ecf0f1",
        color: darkMode ? "#f5f6fa" : "#2c3e50",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Peta Wilayah</h1>
      <p style={{ textAlign: "center" }}>
        Peta interaktif untuk memvisualisasikan potensi risiko banjir di wilayah
        Bandung.
      </p>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label
          htmlFor="area-select"
          style={{
            fontSize: "18px",
            marginRight: "10px",
          }}
        >
          Pilih Kecamatan:
        </label>
        <select
          id="area-select"
          value={selectedArea}
          onChange={handleSelectChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: `2px solid ${darkMode ? "#9c88ff" : "#3498db"}`,
            backgroundColor: darkMode ? "#353b48" : "#fff",
            color: darkMode ? "#f5f6fa" : "#333",
          }}
        >
          <option value="Semua Kecamatan">Semua Kecamatan</option>
          <option value="Cicendo">Cicendo</option>
          <option value="Coblong">Coblong</option>
          <option value="Lengkong">Lengkong</option>
          <option value="Antapani">Antapani</option>
        </select>
      </div>

      <div
        style={{
          height: "500px",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "20px",
          boxShadow: darkMode ? "0 2px 5px rgba(255,255,255,0.1)" : "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <MapContainer
          center={[-6.917464, 107.619122]} // Koordinat default Bandung
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default DashboardPemetaan;
