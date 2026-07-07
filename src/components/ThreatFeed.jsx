import { useEffect, useState } from "react";

const ThreatFeed = () => {
  const [logs, setLogs] = useState([]);

  const events = [
    "🔥 Suspicious login blocked from unknown IP (Russia)",
    "⚠️ SQL Injection attempt detected on /login endpoint",
    "🛡️ Firewall blocked brute-force attack on admin panel",
    "🚨 Malware signature quarantined successfully",
    "🌐 DDoS traffic mitigated at edge node",
    "🔍 Unusual API spike detected and throttled",
    "🧠 AI detected phishing pattern in incoming email traffic",
    "🚫 Unauthorized SSH access attempt denied",
    "📡 Botnet communication pattern identified and blocked",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent =
        events[Math.floor(Math.random() * events.length)];

      const newLog = {
        id: Date.now(),
        message: randomEvent,
        time: new Date().toLocaleTimeString(),
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 12)]);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const styles = {
    section: {
      padding: "100px 20px",
      background:
        "radial-gradient(circle at top, rgba(0,245,255,0.08), transparent 40%), #05060a",
      display: "flex",
      justifyContent: "center",
      color: "white",
    },

    container: {
      width: "100%",
      maxWidth: "950px",
      border: "1px solid rgba(0,245,255,0.15)",
      borderRadius: "14px",
      background: "rgba(11, 15, 26, 0.85)",
      boxShadow: "0 0 40px rgba(0,245,255,0.08)",
      overflow: "hidden",
      backdropFilter: "blur(12px)",
    },

    header: {
      padding: "14px 16px",
      background: "rgba(0,245,255,0.08)",
      borderBottom: "1px solid rgba(0,245,255,0.15)",
      color: "#00f5ff",
      fontSize: "13px",
      fontWeight: "700",
      letterSpacing: "1px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    feed: {
      maxHeight: "400px",
      overflowY: "auto",
      padding: "16px",
      fontFamily: "monospace",
      fontSize: "13px",
      color: "#cbd5e1",
    },

    log: {
      padding: "12px 14px",
      marginBottom: "10px",
      borderLeft: "3px solid #00f5ff",
      background: "rgba(255,255,255,0.03)",
      borderRadius: "8px",
      transition: "0.3s ease",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    },

    time: {
      fontSize: "11px",
      color: "#9ca3af",
      marginBottom: "4px",
    },

    title: {
      textAlign: "center",
      color: "#9ca3af",
      fontSize: "13px",
      marginBottom: "20px",
      letterSpacing: "1px",
    },

    liveDot: {
      width: "8px",
      height: "8px",
      background: "#00f5ff",
      borderRadius: "50%",
      boxShadow: "0 0 10px #00f5ff",
      animation: "pulse 1.5s infinite",
    },
  };

  return (
    <section style={styles.section} id="threat">

      {/* animations */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div>
        <div style={styles.title}>
          LIVE GLOBAL CYBER THREAT MONITORING SYSTEM
        </div>

        <div style={styles.container}>

          {/* HEADER */}
          <div style={styles.header}>
            <span>REAL-TIME SECURITY INCIDENT FEED</span>
            <span style={styles.liveDot}></span>
          </div>

          {/* FEED */}
          <div style={styles.feed}>
            {logs.length === 0 && (
              <div style={{ color: "#6b7280" }}>
                Initializing threat intelligence stream...
              </div>
            )}

            {logs.map((log) => (
              <div
                key={log.id}
                style={styles.log}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#00f5ff";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#00f5ff";
                  e.currentTarget.style.transform = "translateX(0px)";
                }}
              >
                <div style={styles.time}>{log.time}</div>
                <div>{log.message}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ThreatFeed;