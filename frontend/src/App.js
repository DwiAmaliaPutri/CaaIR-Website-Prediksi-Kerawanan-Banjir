import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaHome, FaMap, FaClipboardList, FaInfoCircle, FaQuestionCircle, FaUsers } from "react-icons/fa";
import FormPrediction from "./components/FormPrediction";
import DashboardPemetaan from "./components/DashboardPemetaan";
import Home from "./components/Home";
import InformasiBandung from "./components/Informasi";
import AboutPage from "./components/AboutPage";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update waktu setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div style={appContainerStyle(darkMode)}>
        {/* Sidebar */}
        <nav style={navbarStyle(darkMode)}>
          <div style={{ marginBottom: "20px", color: darkMode ? "#dcdde1" : "#1e272e" }}>
            <p style={{ textAlign: "center", fontSize: "16px", margin: "5px 0" }}>
              Waktu: {currentTime}
            </p>
          </div>
          {/* Logo */}
          <div style={logoContainerStyle}>
            <h2 style={logoTextStyle(darkMode)}>CaaIR</h2>
            <img src="\CaaIR Logo no BG.png" alt="Logo" style={logoStyle} />
          </div>
          {/* Links */}
          <h3 style={sectionTitleStyle(darkMode)}>Navigasi</h3>
          <Link to="/" style={navLinkStyle(darkMode)}>
            <FaHome style={iconStyle} /> Home
          </Link>
          <Link to="/informasi" style={navLinkStyle(darkMode)}>
            <FaInfoCircle style={iconStyle} /> Informasi
          </Link>
          <Link to="/prediksi" style={navLinkStyle(darkMode)}>
            <FaClipboardList style={iconStyle} /> Prediksi
          </Link>
          <Link to="/pemetaan" style={navLinkStyle(darkMode)}>
            <FaMap style={iconStyle} /> Peta Wilayah
          </Link>
          <Link to="/tentang" style={navLinkStyle(darkMode)}>
            <FaQuestionCircle style={iconStyle} /> About Us
          </Link>

          {/* Tombol Mode Tema */}
          <button
            onClick={toggleTheme}
            style={toggleButtonStyle(darkMode)}
          >
            {darkMode ? "Mode Terang" : "Mode Gelap"}
          </button>
        </nav>

        {/* Konten Halaman */}
        <div style={contentStyle(darkMode)}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/informasi" element={<InformasiBandung />} />
            <Route
              path="/prediksi"
              element={
                <div style={{ padding: "20px" }}>
                  <h1 style={{ textAlign: "center", color: darkMode ? "#f5f6fa" : "#2c3e50" }}>
                    Prediksi Banjir
                  </h1>
                  <p style={{ textAlign: "center", color: darkMode ? "#dcdde1" : "#34495e" }}>
                    Masukkan data berikut untuk mengetahui prediksi risiko banjir di lokasi Anda.
                  </p>
                  <FormPrediction />
                </div>
              }
            />
            <Route path="/pemetaan" element={<DashboardPemetaan />} />
            <Route path="/tentang" element={<AboutPage darkMode={darkMode} toggleTheme={toggleTheme} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const appContainerStyle = (darkMode) => ({
  display: "flex",
  height: "100vh",
  fontFamily: "Arial, sans-serif",
  backgroundColor: darkMode ? "#2f3640" : "#ecf0f1",
});

const navbarStyle = (darkMode) => ({
  width: "250px",
  backgroundColor: darkMode ? "#1e272e" : "#f5f6fa",
  color: darkMode ? "white" : "#1e272e",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  boxSizing: "border-box",
  alignItems: "flex-start",
});

const logoContainerStyle = {
  textAlign: "center",
  marginBottom: "30px",
};

const logoTextStyle = (darkMode) => ({
  color: darkMode ? "#f5f6fa" : "#1e272e",
  fontSize: "22px",
  fontWeight: "bold",
});

const logoStyle = {
  width: "150px",
  height: "auto",
};

const sectionTitleStyle = (darkMode) => ({
  fontSize: "16px",
  fontWeight: "bold",
  margin: "10px 0",
  color: darkMode ? "#dcdde1" : "#1e272e",
});

const navLinkStyle = (darkMode) => ({
  color: darkMode ? "#dcdde1" : "#1e272e",
  textDecoration: "none",
  fontWeight: "500",
  margin: "10px 0",
  display: "flex",
  alignItems: "center",
});

const iconStyle = {
  marginRight: "10px",
};

const contentStyle = (darkMode) => ({
  flex: 1,
  padding: "20px",
  overflowY: "auto",
  backgroundColor: darkMode ? "#2f3640" : "#ecf0f1",
  color: darkMode ? "white" : "#2c3e50",
});

const toggleButtonStyle = (darkMode) => ({
  marginTop: "20px",
  padding: "10px 15px",
  backgroundColor: darkMode ? "#f5f6fa" : "#1e272e",
  color: darkMode ? "#1e272e" : "#f5f6fa",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
});

export default App;
