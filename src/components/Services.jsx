const Services = () => {
  const services = [
    {
      title: "AI Threat Detection",
      desc: "Real-time anomaly detection using machine learning models.",
      icon: "🧠",
    },
    {
      title: "Penetration Testing",
      desc: "Automated vulnerability scanning and exploit simulation.",
      icon: "🔓",
    },
    {
      title: "Threat Intelligence",
      desc: "Global attack data aggregation and analysis engine.",
      icon: "🌐",
    },
    {
      title: "Zero Trust Security",
      desc: "Identity-first architecture with strict access control.",
      icon: "🛡️",
    },
    {
      title: "Cloud Security",
      desc: "Multi-cloud monitoring and misconfiguration detection.",
      icon: "☁️",
    },
    {
      title: "Incident Response",
      desc: "Automated breach detection and response workflows.",
      icon: "🚨",
    },
  ];

  const styles = {
    section: {
      padding: "100px 20px",
      background:
        "radial-gradient(circle at top, rgba(0,245,255,0.08), transparent 40%), #05060a",
      color: "white",
      textAlign: "center",
    },

    title: {
      fontSize: "38px",
      fontWeight: "800",
      marginBottom: "10px",
    },

    glow: {
      color: "#00f5ff",
      textShadow: "0 0 18px #00f5ff",
    },

    subtitle: {
      color: "#9ca3af",
      fontSize: "14px",
      marginBottom: "55px",
      maxWidth: "700px",
      marginLeft: "auto",
      marginRight: "auto",
      lineHeight: "1.6",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "22px",
      maxWidth: "1150px",
      margin: "0 auto",
    },

    card: {
      background: "rgba(11, 15, 26, 0.8)",
      border: "1px solid rgba(0,245,255,0.12)",
      borderRadius: "14px",
      padding: "26px",
      textAlign: "left",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      position: "relative",
      overflow: "hidden",
    },

    icon: {
      fontSize: "28px",
      marginBottom: "10px",
    },

    cardTitle: {
      fontSize: "18px",
      fontWeight: "700",
      marginBottom: "8px",
    },

    desc: {
      fontSize: "13px",
      color: "#9ca3af",
      lineHeight: "1.6",
    },

    glowHover: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(135deg, rgba(0,245,255,0.08), rgba(168,85,247,0.08))",
      opacity: 0,
      transition: "0.3s",
    },
  };

  return (
    <section style={styles.section} id="services">
      <h2 style={styles.title}>
        Our <span style={styles.glow}>Security Services</span>
      </h2>

      <p style={styles.subtitle}>
        Advanced AI-driven cybersecurity modules built for modern enterprise-grade
        infrastructure and threat defense systems.
      </p>

      <div style={styles.grid}>
        {services.map((s, i) => (
          <div
            key={i}
            style={styles.card}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.borderColor = "#00f5ff";
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(0,245,255,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(0,245,255,0.12)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.3)";
            }}
          >
            {/* glow layer */}
            <div style={styles.glowHover}></div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={styles.icon}>{s.icon}</div>
              <div style={styles.cardTitle}>{s.title}</div>
              <div style={styles.desc}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;