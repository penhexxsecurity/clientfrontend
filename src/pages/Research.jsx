import React, { useState, useEffect } from "react";

const Research = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  
  // 5 Hardcoded Vulns डिफ़ॉल्ट रूप से स्टेट मैट्रिक्स के अंदर रहेंगे
  const [reports, setReports] = useState([
    {
      title: "Critical SQL Injection in Auth Systems",
      tag: "CVE",
      level: "High",
      desc: "Analysis of SQL injection vulnerability found in authentication workflows.",
      details:
        "This vulnerability occurs when user input is directly embedded into SQL queries without sanitization or parameterized statements.",
      impact:
        "Attackers can bypass authentication, extract sensitive database records, or modify user credentials.",
      attackScenario:
        "An attacker injects payloads like ' OR 1=1-- to bypass login validation.",
      mitigation:
        "Use prepared statements, ORM frameworks, and strict input validation.",
    },
    {
      title: "JWT Token Misconfiguration Exploit",
      tag: "API",
      level: "Medium",
      desc: "Improper JWT validation leading to privilege escalation risks.",
      details:
        "Weak JWT implementation allows attackers to modify token payload or bypass signature verification.",
      impact:
        "Privilege escalation and unauthorized access to protected endpoints.",
      attackScenario:
        "Attacker changes role claim from user → admin inside unsigned JWT.",
      mitigation:
        "Enforce strong signing algorithms and validate tokens on backend.",
    },
    {
      title: "Cloud IAM Privilege Escalation",
      tag: "Cloud",
      level: "High",
      desc: "Misconfigured IAM roles allowing unauthorized access in cloud environments.",
      details:
        "Over-permissive IAM policies allow users to escalate privileges beyond intended scope.",
      impact:
        "Full cloud account takeover or lateral movement across services.",
      attackScenario:
        "User assumes admin role via misconfigured trust relationship.",
      mitigation:
        "Implement least privilege and regular IAM audits.",
    },
    {
      title: "XSS Payload Evolution Techniques",
      tag: "Web",
      level: "Medium",
      desc: "Advanced cross-site scripting bypass methods used in modern applications.",
      details:
        "Modern XSS bypasses include encoding tricks, DOM-based injection, and filter evasion techniques.",
      impact:
        "Session hijacking, defacement, and malicious script execution in browsers.",
      attackScenario:
        "Payload injected into input fields executes via innerHTML rendering.",
      mitigation:
        "Use computational filtering, CSP headers and sanitize all user inputs.",
    },
    {
      title: "AI Model Prompt Injection Attack",
      tag: "AI",
      level: "Critical",
      desc: "Security flaws in LLM systems allowing prompt manipulation and data leakage.",
      details:
        "Attackers manipulate LLM prompts to override system instructions or leak sensitive data.",
      impact:
        "Data leakage, model abuse, and unauthorized behavior execution.",
      attackScenario:
        "User injects hidden instructions that override system prompt.",
      mitigation:
        "Use input filtering, prompt isolation, and output validation.",
    },
  ]);

  // Firestore से लाइव डेटा फ़ेच करने के लिए इफेक्ट हुक
  useEffect(() => {
    const fetchVulnerabilities = async () => {
      try {
        const response = await fetch(
          "https://backend-gitignore.onrender.com/api/general/vulnerabilities"
        );
  
        const result = await response.json();
  
        if (!result.success) {
          throw new Error(result.error || "Failed to fetch vulnerabilities");
        }
  
        const liveReports = result.data.map((item) => ({
          id: item.id || Math.random().toString(),
          title: item.vulnerability_name || "Unknown Vulnerability",
          tag: "Live",
          level: item.severity || "Medium",
          desc: item.description || "No description provided.",
          details: item.description || "No detailed analysis available.",
          impact: item.impact || "No impact data available.",
          attackScenario: item.report_url
            ? `Report Artifact: ${item.report_url}`
            : "N/A",
          mitigation:
            item.recommendation || "No mitigation provided yet.",
        }));
  
        setReports((prevReports) => {
          const baseHardcoded = prevReports.slice(0, 5);
          return [...baseHardcoded, ...liveReports];
        });
      } catch (err) {
        console.error("Failed to fetch vulnerabilities:", err);
      }
    };
  
    fetchVulnerabilities();
  }, []);

  const levelColor = (level) => {
    switch (level) {
      case "Critical":
        return "ph-res-critical";
      case "High":
        return "ph-res-high";
      case "Medium":
        return "ph-res-medium";
      default:
        return "ph-res-default";
    }
  };

  const Card = ({ item }) => (
    <div className="ph-res-card">
      <div className="ph-res-card-top">
        <span className="ph-res-badge-tag">{item.tag}</span>
        <span className={levelColor(item.level)}>{item.level}</span>
      </div>

      <div className="ph-res-card-heading">{item.title}</div>
      
      {/* Scrollable Description Area */}
      <div className="ph-res-card-text">
        {item.desc}
      </div>

      <div className="ph-res-card-bottom" onClick={() => setSelectedReport(item)}>
        <span className="ph-res-inline-btn">Open Report →</span>
        <div className="ph-res-status-dot"></div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        /* ==========================================================================
           PAGE LAYOUT & CONTAINER CSS
           ========================================================================== */
        .ph-res-page {
          background: #05060a;
          color: white;
          min-height: 100vh;
          padding-top: 80px;
          padding-bottom: 80px;
          padding-left: 24px;
          padding-right: 24px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .ph-res-container {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        /* ==========================================================================
           HERO SECTION CSS
           ========================================================================== */
        .ph-res-hero-section {
          text-align: center;
          margin-bottom: 40px;
        }

        .ph-res-main-title {
          font-size: 44px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin: 0;
        }

        .ph-res-cyan-glow {
          color: #00f5ff;
          text-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
        }

        /* ==========================================================================
           GRID LAYOUT
           ========================================================================== */
        .ph-res-grid-layout {
          margin-top: 60px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        /* ==========================================================================
           VULNERABILITY CARD STRUCTURE (FIXED RATIO & HEIGHT)
           ========================================================================== */
        .ph-res-card {
          background: #0b0f1a;
          border-width: 1px;
          border-style: solid;
          border-color: rgba(168, 85, 247, 0.2);
          padding-top: 24px;
          padding-bottom: 24px;
          padding-left: 24px;
          padding-right: 24px;
          border-radius: 14px;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          
          /* Fixed Height to keep ratios same across all cards */
          height: 250px; 
          display: flex;
          flex-direction: column;
        }

        .ph-res-card:hover {
          border-color: #00f5ff;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 245, 255, 0.1);
        }

        /* CARD HEADER Elements */
        .ph-res-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }

        .ph-res-badge-tag {
          font-size: 11px;
          font-weight: 600;
          color: #00f5ff;
          border-width: 1px;
          border-style: solid;
          border-color: rgba(0, 245, 255, 0.4);
          padding-top: 4px;
          padding-bottom: 4px;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        /* CARD BODY Elements */
        .ph-res-card-heading {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.4;
          margin-top: 14px;
          color: #ffffff;
          flex-shrink: 0;
        }

        /* SCROLLABLE SCENARIO FOR LONG TEXT */
        .ph-res-card-text {
          font-size: 13px;
          color: #9ca3af;
          line-height: 1.5;
          margin-top: 10px;
          overflow-y: auto;
          flex-grow: 1;
          padding-right: 4px;
        }

        /* Custom Scrollbar for Text Content */
        .ph-res-card-text::-webkit-scrollbar {
          width: 4px;
        }
        .ph-res-card-text::-webkit-scrollbar-track {
          background: transparent;
        }
        .ph-res-card-text::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 2px;
        }
        .ph-res-card-text::-webkit-scrollbar-thumb:hover {
          background: #00f5ff;
        }

        /* CARD FOOTER Elements */
        .ph-res-card-bottom {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
          cursor: pointer;
        }

        .ph-res-inline-btn {
          color: #00f5ff;
          font-size: 12px;
          font-weight: 600;
          transition: color 0.2s;
        }

        .ph-res-card:hover .ph-res-inline-btn {
          color: #ffffff;
        }

        .ph-res-status-dot {
          width: 8px;
          height: 8px;
          background-color: #a855f7;
          border-radius: 50%;
          box-shadow: 0 0 8px #a855f7;
        }

        /* ==========================================================================
           SEVERITY LEVEL DYNAMIC COLORS
           ========================================================================== */
        .ph-res-critical {
          color: #ef4444;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ph-res-high {
          color: #f97316;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ph-res-medium {
          color: #eab308;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ph-res-default {
          color: #9ca3af;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ==========================================================================
           MODAL INTERFACE CSS
           ========================================================================== */
        .ph-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(5, 6, 10, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .ph-modal {
          width: 600px;
          max-width: 90%;
          background: #0b0f1a;
          border-width: 1px;
          border-style: solid;
          border-color: rgba(0, 245, 255, 0.2);
          padding-top: 28px;
          padding-bottom: 28px;
          padding-left: 28px;
          padding-right: 28px;
          border-radius: 14px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          max-height: 85vh;
          overflow-y: auto;
        }

        .ph-modal-title {
          color: #00f5ff;
          font-size: 22px;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .ph-btn {
          margin-top: 24px;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 18px;
          padding-right: 18px;
          background: #a855f7;
          border: none;
          color: white;
          font-weight: 600;
          font-size: 13px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }

        .ph-btn:hover {
          background: #9333ea;
        }

        .ph-btn:active {
          transform: scale(0.98);
        }
      `}</style>

      <div className="ph-res-page">
        <div className="ph-res-container">

          {/* HERO */}
          <div className="ph-res-hero-section">
            <h1 className="ph-res-main-title">
              Research <span className="ph-res-cyan-glow">Labs</span>
            </h1>
          </div>

          {/* GRID */}
          <div className="ph-res-grid-layout">
            {reports.map((item, i) => (
              <Card key={item.id || `fallback-key-${i}`} item={item} />
            ))}
          </div>

          {/* MODAL */}
          {selectedReport && (
            <div
              className="ph-modal-overlay"
              onClick={() => setSelectedReport(null)}
            >
              <div className="ph-modal" onClick={(e) => e.stopPropagation()}>
                
                <h2 className="ph-modal-title">{selectedReport.title}</h2>

                <p style={{ color: "#9ca3af", lineHeight: "1.6", fontSize: "14px" }}>
                  {selectedReport.details}
                </p>

                <div style={{ marginTop: 16 }}>
                  <h4 style={{ color: "#fff", marginBottom: "4px" }}>Impact</h4>
                  <p style={{ color: "#9ca3af", fontSize: 13, margin: 0, lineHeight: "1.5" }}>
                    {selectedReport.impact}
                  </p>
                </div>

                <div style={{ marginTop: 16 }}>
                  <h4 style={{ color: "#fff", marginBottom: "4px" }}>Attack Scenario / Ref</h4>
                  <p style={{ color: "#9ca3af", fontSize: 13, margin: 0, lineHeight: "1.5" }}>
                    {selectedReport.attackScenario}
                  </p>
                </div>

                <div style={{ marginTop: 16 }}>
                  <h4 style={{ color: "#fff", marginBottom: "4px" }}>Mitigation / Recommendation</h4>
                  <p style={{ color: "#9ca3af", fontSize: 13, margin: 0, lineHeight: "1.5" }}>
                    {selectedReport.mitigation}
                  </p>
                </div>

                <button
                  className="ph-btn"
                  onClick={() => setSelectedReport(null)}
                >
                  Close Report
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Research;
