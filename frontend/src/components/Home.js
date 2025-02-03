import React, { useState, useEffect } from 'react';

const Home = () => {
  const [hovered, setHovered] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [token, setToken] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);  // Menyimpan status mode gelap

  const styles = {
    container: {
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      backgroundColor: isDarkMode ? '#121212' : '#f0f8ff',
      color: isDarkMode ? '#f0f0f0' : '#333',
      transition: 'all 0.3s ease',
    },
    hero: {
      backgroundColor: isDarkMode ? '#333' : '#f0f8ff',
      padding: '40px 20px',
      borderRadius: '8px',
      boxShadow: isDarkMode ? '0 4px 8px rgba(0, 0, 0, 0.3)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
    },
    heroHover: { transform: 'scale(1.02)' },
    titleLarge: { fontSize: '2.5rem', margin: '0', color: isDarkMode ? '#fff' : '#333', fontWeight: 'bold' },
    titleSmall: { fontSize: '1rem', margin: '0', color: isDarkMode ? '#bbb' : '#666', fontWeight: 'normal' },
    features: {
      marginTop: '40px',
      display: 'flex',
      justifyContent: 'space-between',  // Membuat jarak antar kotak
      gap: '20px',  // Menambahkan jarak antar kotak
      flexWrap: 'wrap',  // Membuat kotak bisa turun jika ukuran layar kecil
      justifyItems: 'center',
      padding: '0 10px',  // Menambahkan padding untuk menghindari kotak keluar
    },
    featureCard: {
      flex: '1 1 300px', // Kotak akan membesar sampai 300px atau lebih jika space tersedia
      padding: '20px',
      border: isDarkMode ? '1px solid #555' : '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: isDarkMode ? '#333' : '#fff',
      boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.1)', // Shade yang lebih halus
      transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      textAlign: 'left',  // Merapikan posisi teks
    },
    featureCardHover: { 
      boxShadow: isDarkMode ? '0 6px 16px rgba(0, 0, 0, 0.2)' : '0 6px 16px rgba(0, 0, 0, 0.15)', 
      transform: 'scale(1.02)'  // Menambahkan efek memperbesar sedikit saat hover
    },
    featureTitle: {
      fontSize: '1.4rem',
      marginBottom: '10px',  // Menambahkan jarak antara judul dan deskripsi
      color: isDarkMode ? '#fff' : '#333',
      fontWeight: 'bold',
    },
    featureDescription: {
      fontSize: '1rem',
      color: isDarkMode ? '#bbb' : '#666',
      lineHeight: '1.6',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: isDarkMode ? '#007bff' : '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: { backgroundColor: '#0056b3' },
    footer: {
      marginTop: '40px',
      padding: '10px',
      backgroundColor: isDarkMode ? '#222' : '#222',
      color: '#fff',
      borderRadius: '8px',
      fontSize: '14px',
    },
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000',
    },
    modalContent: {
      backgroundColor: isDarkMode ? '#333' : 'white',
      padding: '20px',
      borderRadius: '8px',
      width: '300px',
      textAlign: 'center',
    },
    textLightMode: { color: '#333' }, // Teks untuk mode terang
    textDarkMode: { color: '#f0f0f0' }, // Teks untuk mode gelap
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setIsTokenValid(true);
      setIsSubscribed(true);
    }
  }, []);

  const handleTokenSubmit = () => {
    if (token === '1234') {
      setIsSubscribed(true);
      setIsTokenValid(true);
      localStorage.setItem('token', token);  // Simpan token di localStorage
    } else {
      setIsTokenValid(false);
    }    
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Toggle antara mode terang dan gelap
  };

  return (
    <div style={styles.container}>
      {/* Tombol untuk mengubah mode gelap/terang */}
      <button
        onClick={toggleDarkMode}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: isDarkMode ? '#fff' : '#333',
          color: isDarkMode ? '#333' : '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      {/* Hero Section */}
      <section
        style={{ ...styles.hero, ...(hovered ? styles.heroHover : {}) }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h1 style={styles.titleLarge}>CaaIR</h1>
        <p style={styles.titleSmall}>Flood Risk Prediction</p>
        <p>We help you predict flood risks based on real data for better planning and safety.</p>
        <button
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={() => setIsSubscribed(false)} // Trigger subscription flow
        >
          Get Started
        </button>
      </section>

      {/* Modal for Subscription */}
      {!isSubscribed && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={isDarkMode ? styles.textDarkMode : styles.textLightMode}>Subscribe</h2>
            <p style={isDarkMode ? styles.textDarkMode : styles.textLightMode}>You need to subscribe and enter your token.</p>
            <input
              type="text"
              placeholder="Enter Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={{ padding: '10px', margin: '10px 0', width: '80%' }}
            />
            <button onClick={handleTokenSubmit} style={styles.button}>
              Submit
            </button>
            {!isTokenValid && token && (
              <p style={{ color: 'red' }}>Invalid token, please try again.</p>
            )}
          </div>
        </div>
      )}

      {/* Features Section */}
      {isSubscribed && (
        <section id="features" style={styles.features}>
          {[{ title: 'Accurate Predictions', description: 'Utilizing the latest AI technology to predict flood risks.' },
            { title: 'Comprehensive Analysis', description: 'Analyze rainfall, land usage, and soil type effectively.' },
            { title: 'User-Friendly', description: 'Simple interface for all users.' },
            { title: 'AI-Driven Insights', description: 'Leverage AI to gain deeper insights for better decision making.' }].map((feature, index) => (
            <div
              key={index}
              style={{ ...styles.featureCard, ...(hovered ? styles.featureCardHover : {}) }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 CaaIR</p>
        <p>Contact us: support@floodprediction.com</p>
      </footer>
    </div>
  );
};

export default Home;
