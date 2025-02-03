import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Image } from "react-bootstrap";
import Papa from "papaparse";

function InformasiBandung({ darkMode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [floodProneData, setFloodProneData] = useState([]);

  useEffect(() => {
    // Mengimpor dan membaca data CSV
    Papa.parse("/merged_data.csv", {
      download: true,
      header: true, 
      complete: (result) => {
        console.log(result.data); 
        setFloodProneData(result.data);
      },
    });
  }, []);

  const filteredData = floodProneData.filter((data) =>
    data.lokasi && data.lokasi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={contentStyle(darkMode)}>
      <h1 style={{ textAlign: "center", color: darkMode ? "#f5f6fa" : "#2c3e50" }}>
        Informasi Bandung
      </h1>
      <p style={{ textAlign: "center", color: darkMode ? "#dcdde1" : "#34495e" }}>
        Bandung sering dilanda banjir akibat kombinasi berbagai faktor, seperti curah hujan tinggi, penggunaan lahan yang tidak terencana,
        dan jenis tanah yang kurang menyerap air. Berita terbaru menyebutkan beberapa daerah di Bandung yang paling terdampak,
        seperti kawasan Cileunyi, Cibiru Wetan dan lain-lain, sering menghadapi banjir parah setelah hujan deras. Penyebab utama meliputi
        saluran drainase yang tersumbat, urbanisasi yang cepat, dan kurangnya ruang terbuka hijau.
      </p>

      {/* Gambar Top 10 Lokasi dengan Risiko Banjir */}
      <Container style={{ marginTop: "30px" }}>
        <Row>
          <Col md={8} className="text-center mb-4">
            <h3 style={{ textAlign: "center" }}>Top 10 Lokasi dengan Risiko Banjir</h3>
            <Image 
              src="Highest-Flood.png" 
              alt="Top 10 Lokasi dengan Risiko Banjir" 
              fluid 
              style={{
                objectFit: "contain", 
                maxHeight: "600px",   
                width: "100%",        
                borderRadius: "10px", 
              }}
            />
            <p style={{ color: darkMode ? "#dcdde1" : "#34495e", fontSize: "16px", textAlign: "center" }}>
              Gambar di atas menunjukkan sepuluh lokasi dengan risiko banjir tertinggi berdasarkan data curah hujan dan jumlah banjir yang tercatat.
            </p>
          </Col>
          <Col md={4} className="text-center mb-4">
            <h3 style={{ textAlign: "center" }}>Distribusi Risiko Banjir</h3>
            <Image 
              src="Distribusi.png" 
              alt="Distribusi Risiko Banjir" 
              fluid 
              style={{
                objectFit: "contain",
                maxHeight: "350px",  
                width: "100%",       
                borderRadius: "10px",
              }}
            />
            <p style={{ color: darkMode ? "#dcdde1" : "#34495e", fontSize: "16px", textAlign: "center" }}>
              Grafik ini menunjukkan distribusi risiko banjir di berbagai wilayah Bandung berdasarkan probabilitas prediksi.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Tabel Lokasi yang Berpotensi Banjir */}
      <div style={{ marginTop: "20px", overflowX: "auto" }}>
        {/* Notes below the table */}
        <p style={{ fontSize: "14px", color: darkMode ? "#dcdde1" : "#34495e", textAlign: "center" }}>
          Catatan: Angka <strong>1</strong> berarti Banjir, dan angka <strong>0</strong> berarti Tidak Banjir pada Kolom Hasil Prediksi.
        </p>

        {/* Search Bar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Cari Lokasi"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "50%",
              padding: "10px",
              borderRadius: "5px",
              border: darkMode ? "1px solid #fff" : "1px solid #ccc",
              backgroundColor: darkMode ? "#34495e" : "#fff",
              color: darkMode ? "#f5f6fa" : "#2c3e50",
            }}
          />
        </div>

        <Table striped bordered hover responsive="sm" className="custom-table">
          <thead>
            <tr>
              <th>Lokasi</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Curah Hujan</th>
              <th>Jumlah Banjir</th>
              <th>Hasil Prediksi</th>
              <th>Probabilitas Prediksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <tr key={index}>
                  <td>{data.lokasi}</td>
                  <td>{data.latitude}</td>
                  <td>{data.longitude}</td>
                  <td>{data.curah_hujan}</td>
                  <td>{data.jumlah_banjir}</td>
                  <td>{data.Hasil_Prediksi}</td>
                  <td>{data.Probabilitas_Prediksi}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>Data Tidak Ditemukan</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

const contentStyle = (darkMode) => ({
  backgroundColor: darkMode ? "#2f3640" : "#ecf0f1",
  color: darkMode ? "white" : "#2c3e50",
  padding: "20px",
  borderRadius: "10px",
});

export default InformasiBandung;
