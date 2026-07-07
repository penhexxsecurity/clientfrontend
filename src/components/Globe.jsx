const Globe = () => {
  const styles = {
    section: {
      height: "100vh",
      background:
        "radial-gradient(circle at center, rgba(0,245,255,0.08), transparent 40%), #05060a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      color: "white",
    },

    container: {
      textAlign: "center",
      zIndex: 5,
      maxWidth: "700px",
      padding: "0 20px",
    },

    title: {
      fontSize: "38px",
      fontWeight: "800",
      letterSpacing: "1px",
      marginBottom: "12px",
    },

    glow: {
      color: "#00f5ff",
      textShadow: "0 0 20px #00f5ff",
    },

    subtitle: {
      color: "#9ca3af",
      fontSize: "14px",
      lineHeight: "1.6",
    },

    globe: {
      position: "absolute",
      width: "360px",
      height: "360px",
      borderRadius: "50%",
      border: "1px solid rgba(0,245,255,0.25)",
      boxShadow: "0 0 80px rgba(0,245,255,0.15)",
      animation: "spin 18s linear infinite",
    },

    globeInner: {
      position: "absolute",
      width: "360px",
      height: "360px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 30% 30%, rgba(0,245,255,0.15), transparent 60%)",
      animation: "pulse 4s ease-in-out infinite",
    },

    dots: {
      position: "absolute",
      width: "360px",
      height: "360px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(0,245,255,0.6) 1px, transparent 1px)",
      backgroundSize: "28px 28px",
      opacity: 0.35,
      animation: "pulse 3s infinite",
    },
  };

  return (
    <section style={styles.section}>

      {/* GLOBAL ANIMATIONS */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* GLOBE LAYERS */}
      <div style={styles.globe}></div>
      <div style={styles.globeInner}></div>
      <div style={styles.dots}></div>

      {/* CONTENT */}
      <div style={styles.container}>
        <h2 style={styles.title}>
          GLOBAL <span style={styles.glow}>THREAT NETWORK</span>
        </h2>

        <p style={styles.subtitle}>
          Real-time cyber intelligence monitoring across global systems,
          tracking threat actors, anomalies, and attack patterns using AI-driven
          security intelligence.
        </p>
      </div>

    </section>
  );
};

export default Globe;