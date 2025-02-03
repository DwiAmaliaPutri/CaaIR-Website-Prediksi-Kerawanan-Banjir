import React from "react";

function AboutPage({ darkMode }) {
  return (
    <div style={containerStyle(darkMode)}>
      <h1 style={titleStyle(darkMode)}>Tentang Kami</h1>
      <p style={textStyle(darkMode)}>
        Kami adalah tim yang berdedikasi untuk memberikan prediksi banjir yang
        akurat dan tepat waktu, menggunakan teknologi canggih dan data terkini.
      </p>
      <div style={cardContainerStyle}>
        <div style={cardStyle(darkMode)}>
          <img
            src="/Haeqal SRE.jpg" 
            alt="Anggota 1"
            style={photoStyle}
          />
          <h3 style={nameStyle(darkMode)}>Haeqal Salehudin</h3>
          <p style={roleStyle(darkMode)}>CEO</p>
        </div>
        <div style={cardStyle(darkMode)}>
          <img
            src="Aryan.png" 
            alt="Anggota 2"
            style={photoStyle}
          />
          <h3 style={nameStyle(darkMode)}>Aryan Riyanto</h3>
          <p style={roleStyle(darkMode)}>Business Development</p>
        </div>
        <div style={cardStyle(darkMode)}>
          <img
            src="prastiyo.png" 
            alt="Anggota 3"
            style={photoStyle}
          />
          <h3 style={nameStyle(darkMode)}>Prastiyo B.S.</h3>
          <p style={roleStyle(darkMode)}>Hacker</p>
        </div>
        <div style={cardStyle(darkMode)}>
          <img
            src="Lia.png" 
            alt="Anggota 4"
            style={photoStyle}
          />
          <h3 style={nameStyle(darkMode)}>Dwi Amalia Putri</h3>
          <p style={roleStyle(darkMode)}>Sales & Marketing</p>
        </div>
        <div style={cardStyle(darkMode)}>
          <img
            src="Amanda.png" 
            alt="Anggota 5"
            style={photoStyle}
          />
          <h3 style={nameStyle(darkMode)}>Ni Putu Diah Amanda</h3>
          <p style={roleStyle(darkMode)}>Hipster</p>
        </div>
      </div>
    </div>
  );
}

const containerStyle = (darkMode) => ({
  padding: "20px",
  backgroundColor: darkMode ? "#2f3640" : "#ecf0f1",
  color: darkMode ? "#dcdde1" : "#2c3e50",
});

const titleStyle = (darkMode) => ({
  textAlign: "center",
  fontSize: "32px",
  fontWeight: "bold",
  color: darkMode ? "#f5f6fa" : "#1e272e",
});

const textStyle = (darkMode) => ({
  textAlign: "center",
  fontSize: "18px",
  margin: "20px 0",
  color: darkMode ? "#dcdde1" : "#34495e",
});

const cardContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle = (darkMode) => ({
  backgroundColor: darkMode ? "#3a3d42" : "#f1f2f6",
  padding: "15px",
  borderRadius: "8px",
  width: "200px",
  textAlign: "center",
  boxShadow: darkMode ? "0 4px 10px rgba(0, 0, 0, 0.3)" : "0 4px 10px rgba(0, 0, 0, 0.1)",
});

const nameStyle = (darkMode) => ({
  fontSize: "20px",
  fontWeight: "bold",
  color: darkMode ? "#f5f6fa" : "#1e272e",
});

const roleStyle = (darkMode) => ({
  fontSize: "16px",
  color: darkMode ? "#dcdde1" : "#34495e",
});

// Foto anggota dengan ukuran tetap
const photoStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "10px",
};

export default AboutPage;
