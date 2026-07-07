import { useState, useEffect } from "react";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([
    "[SYSTEM] Penhexx Security terminal initialized...",
    "[INFO] Connecting to global threat intelligence network...",
    "[SUCCESS] Secure encrypted channel established.",
  ]);

  const commands = {
    help: "Available commands: scan, status, threats, clear",
    scan: "Scanning network... 42 vulnerabilities detected (simulated)",
    status: "All systems operational. Defense layer: ACTIVE",
    threats: "Active threats: APT-29, Lazarus Group (simulated)",
  };

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();

    let response =
      commands[command] || `[ERROR] Unknown command: ${command}`;

    setLogs((prev) => [...prev, `> ${command}`, response]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    handleCommand(input);
    setInput("");
  };

  const handleClear = () => {
    setLogs(["[SYSTEM] Terminal cleared..."]);
  };

  const styles = {
    section: {
      background:
        "radial-gradient(circle at top, rgba(0,245,255,0.08), transparent 40%), #05060a",
      padding: "90px 20px",
      display: "flex",
      justifyContent: "center",
      color: "white",
    },

    box: {
      width: "100%",
      maxWidth: "900px",
      background: "rgba(11, 15, 26, 0.85)",
      border: "1px solid rgba(0,245,255,0.15)",
      borderRadius: "14px",
      boxShadow: "0 0 40px rgba(0,245,255,0.08)",
      overflow: "hidden",
      backdropFilter: "blur(12px)",
    },

    header: {
      background: "rgba(0,245,255,0.08)",
      padding: "12px 16px",
      fontSize: "13px",
      color: "#00f5ff",
      borderBottom: "1px solid rgba(0,245,255,0.15)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      letterSpacing: "1px",
    },

    logs: {
      height: "380px",
      overflowY: "auto",
      padding: "16px",
      fontFamily: "monospace",
      fontSize: "13px",
      lineHeight: "1.6",
      color: "#cbd5e1",
    },

    inputBox: {
      display: "flex",
      borderTop: "1px solid rgba(0,245,255,0.15)",
    },

    input: {
      flex: 1,
      padding: "12px",
      background: "transparent",
      border: "none",
      outline: "none",
      color: "#00f5ff",
      fontFamily: "monospace",
    },

    button: {
      background: "#00f5ff",
      border: "none",
      padding: "0 22px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#000",
      transition: "0.3s",
    },

    clearBtn: {
      background: "transparent",
      border: "1px solid #00f5ff",
      color: "#00f5ff",
      padding: "6px 12px",
      cursor: "pointer",
      fontSize: "12px",
      transition: "0.3s",
    },
  };

  useEffect(() => {
    const el = document.getElementById("terminalLogs");
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  return (
    <section style={styles.section}>

      {/* CYBER GLOW ANIMATION */}
      <style>{`
        @keyframes glow {
          0% { box-shadow: 0 0 10px rgba(0,245,255,0.1); }
          50% { box-shadow: 0 0 25px rgba(0,245,255,0.25); }
          100% { box-shadow: 0 0 10px rgba(0,245,255,0.1); }
        }
      `}</style>

      <div style={{ ...styles.box, animation: "glow 4s infinite" }}>

        {/* HEADER */}
        <div style={styles.header}>
          <span>PE NHEXX SECURITY TERMINAL v1.0</span>
          <button
            style={styles.clearBtn}
            onClick={handleClear}
            onMouseOver={(e) => (e.target.style.background = "rgba(0,245,255,0.1)")}
            onMouseOut={(e) => (e.target.style.background = "transparent")}
          >
            CLEAR
          </button>
        </div>

        {/* LOGS */}
        <div id="terminalLogs" style={styles.logs}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: "4px" }}>
              {log}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <form onSubmit={handleSubmit} style={styles.inputBox}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command... (help, scan, status)"
          />
          <button style={styles.button}>RUN</button>
        </form>

      </div>
    </section>
  );
};

export default Terminal;