import React, { useState, useEffect } from "react";

const ThreatIntel = () => {
  const [stats, setStats] = useState({
    attacks: 12842,
    blocked: 982341,
    vulnerabilities: 7832,
    countries: 56,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        attacks: prev.attacks + Math.floor(Math.random() * 5),
        blocked: prev.blocked + Math.floor(Math.random() * 20),
        vulnerabilities: prev.vulnerabilities + Math.floor(Math.random() * 2),
        countries: prev.countries,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const feeds = [
    {
      type: "Ransomware",
      message: "New ransomware variant detected targeting cloud servers.",
      level: "Critical",
    },
    {
      type: "API Attack",
      message: "Abnormal API request pattern detected in authentication service.",
      level: "High",
    },
    {
      type: "Phishing",
      message: "Mass phishing campaign identified across enterprise email systems.",
      level: "Medium",
    },
    {
      type: "Zero-Day",
      message: "Potential zero-day exploit under active investigation.",
      level: "Critical",
    },
    {
      type: "Botnet",
      message: "Distributed botnet traffic spike detected globally.",
      level: "High",
    },
  ];

  const levelClass = (level) => {
    switch (level) {
      case "Critical":
        return "ph-intel-critical";
      case "High":
        return "ph-intel-high";
      case "Medium":
        return "ph-intel-medium";
      default:
        return "ph-intel-default";
    }
  };

  return (
    <>
      <style>{`
        .ph-intel-page {
          background: #05060a;
          color: white;
          min-height: 100vh;
          padding: 80px 24px;
          font-family: system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
        }

        .ph-intel-container {
          max-width: 1200px;
          margin: auto;
        }

        /* Hero Layout */
        .ph-intel-hero-section {
          text-align: center;
          max-width: 800px;
          margin: auto;
        }

        .ph-intel-main-title {
          font-size: 44px;
          font-weight: 800;
          margin: 0;
          color: white;
        }

        .ph-intel-cyan-glow {
          color: #00f5ff;
          text-shadow: 0 0 18px rgba(0, 245, 255, 0.4);
        }

        .ph-intel-hero-desc {
          color: #9ca3af;
          margin-top: 16px;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 0;
        }

        /* Stats Grid Metrics */
        .ph-intel-stats-grid {
          margin-top: 50px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
        }

        .ph-intel-stat-card {
          background: #0b0f1a;
          border: 1px solid rgba(168, 85, 247, 0.2);
          padding: 24px;
          border-radius: 14px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .ph-intel-stat-card:hover {
          border-color: #00f5ff;
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 245, 255, 0.08);
        }

        .ph-intel-metric-num {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .ph-intel-metric-label {
          color: #9ca3af;
          margin-top: 8px;
          font-size: 13.5px;
          font-weight: 500;
        }

        /* Live Feed Section */
        .ph-intel-feed-wrapper {
          margin-top: 70px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .ph-intel-feed-title {
          font-size: 22px;
          font-weight: 700;
          color: #a855f7;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }

        .ph-intel-feed-item {
          background: #0b0f1a;
          border: 1px solid rgba(168, 85, 247, 0.2);
          padding: 18px;
          border-radius: 12px;
          margin-bottom: 14px;
          transition: border-color 0.2s ease;
        }

        .ph-intel-feed-item:hover {
          border-color: #00f5ff;
        }

        .ph-intel-item-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ph-intel-badge-tag {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(0, 245, 255, 0.4);
          color: #00f5ff;
          background: rgba(0, 245, 255, 0.05);
          letter-spacing: 0.5px;
        }

        .ph-intel-item-msg {
          margin-top: 12px;
          font-size: 13.5px;
          color: #d1d5db;
          line-height: 1.5;
        }

        /* SEVERITY LEVEL TYPOGRAPHY */
        .ph-intel-critical { color: #ef4444; font-weight: 700; font-size: 12.5px; }
        .ph-intel-high { color: #f97316; font-weight: 700; font-size: 12.5px; }
        .ph-intel-medium { color: #eab308; font-weight: 700; font-size: 12.5px; }
        .ph-intel-default { color: #00f5ff; font-weight: 700; font-size: 12.5px; }

        /* CTA Panel */
        .ph-intel-cta-block {
          text-align: center;
          margin-top: 80px;
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .ph-intel-cta-block h2 {
          font-size: 24px;
          font-weight: 800;
          margin: 0;
          color: white;
        }

        .ph-intel-action-btn {
          margin-top: 24px;
          padding: 12px 28px;
          background: #00f5ff;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 15px;
          color: #05060a;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ph-intel-action-btn:hover {
          background: #00d5dd;
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.35);
        }

        .ph-intel-footer-note {
          margin-top: 16px;
          color: #9ca3af;
          font-size: 13.5px;
        }

        .ph-intel-purple-text {
          color: #a855f7;
        }
      `}</style>

      <div className="ph-intel-page">
        <div className="ph-intel-container">
          
          {/* HERO */}
          <div className="ph-intel-hero-section">
            <h1 className="ph-intel-main-title">
              Threat <span className="ph-intel-cyan-glow">Intelligence</span> Dashboard
            </h1>
            <p className="ph-intel-hero-desc">
              Real-time global cyber attack monitoring system powered by AI-based threat detection
              and analytics.
            </p>
          </div>

          {/* STATS */}
          <div className="ph-intel-stats-grid">
            <div className="ph-intel-stat-card">
              <div className="ph-intel-metric-num" style={{ color: "#ef4444" }}>
                {stats.attacks.toLocaleString()}
              </div>
              <div className="ph-intel-metric-label">Active Attacks</div>
            </div>

            <div className="ph-intel-stat-card">
              <div className="ph-intel-metric-num" style={{ color: "#00f5ff" }}>
                {stats.blocked.toLocaleString()}
              </div>
              <div className="ph-intel-metric-label">Threats Blocked</div>
            </div>

            <div className="ph-intel-stat-card">
              <div className="ph-intel-metric-num" style={{ color: "#a855f7" }}>
                {stats.vulnerabilities.toLocaleString()}
              </div>
              <div className="ph-intel-metric-label">Vulnerabilities</div>
            </div>

            <div className="ph-intel-stat-card">
              <div className="ph-intel-metric-num" style={{ color: "#00f5ff" }}>
                {stats.countries}
              </div>
              <div className="ph-intel-metric-label">Active Regions</div>
            </div>
          </div>

          {/* FEED */}
          <div className="ph-intel-feed-wrapper">
            <div className="ph-intel-feed-title">Live Threat Feed</div>

            {feeds.map((item, index) => (
              <div className="ph-intel-feed-item" key={index}>
                <div className="ph-intel-item-top">
                  <span className="ph-intel-badge-tag">{item.type}</span>
                  <span className={levelClass(item.level)}>
                    {item.level}
                  </span>
                </div>
                <div className="ph-intel-item-msg">{item.message}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="ph-intel-cta-block">
            <h2>
              Stay Ahead of Cyber Threats with{" "}
              <span className="ph-intel-purple-text">Penhexx AI</span>
            </h2>

            <button className="ph-intel-action-btn">Enable Live Protection</button>

            <div className="ph-intel-footer-note">
              Real-time monitoring, detection, and automated response system.
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ThreatIntel;