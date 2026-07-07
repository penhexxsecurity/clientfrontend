const Stats = () => {
  const stats = [
    { label: "Threats Detected", value: "1.2M+" },
    { label: "Active Scans", value: "8,450" },
    { label: "Protected Nodes", value: "320K+" },
    { label: "Response Time", value: "< 0.3s" },
  ];

  const styles = {
    section: {
      padding: "90px 20px",
      background:
        "radial-gradient(circle at top, rgba(0,245,255,0.08), transparent 40%), #05060a",
      color: "white",
      display: "flex",
      justifyContent: "center",
    },

    container: {
      width: "100%",
      maxWidth: "1100px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "22px",
    },

    card: {
      background: "rgba(11, 15, 26, 0.75)",
      border: "1px solid rgba(0,245,255,0.12)",
      borderRadius: "14px",
      padding: "26px",
      textAlign: "center",
      backdropFilter: "blur(12px)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
    },

    glow: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(135deg, rgba(0,245,255,0.08), rgba(168,85,247,0.08))",
      opacity: 0,
      transition: "0.3s",
    },

    value: {
      fontSize: "30px",
      fontWeight: "800",
      color: "#00f5ff",
      textShadow: "0 0 15px #00f5ff",
      position: "relative",
      zIndex: 2,
    },

    label: {
      marginTop: "10px",
      fontSize: "13px",
      color: "#9ca3af",
      letterSpacing: "1px",
      position: "relative",
      zIndex: 2,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {stats.map((item, i) => (
          <div
            key={i}
            style={styles.card}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.borderColor = "#00f5ff";
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(0,245,255,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(0,245,255,0.12)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.35)";
            }}
          >
            {/* glow layer */}
            <div style={styles.glow}></div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={styles.value}>{item.value}</div>
              <div style={styles.label}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;