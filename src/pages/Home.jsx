import React from "react";
// 1. React Router se useNavigate import kiya
import { useNavigate } from "react-router-dom";

const Home = () => {
  // 2. Navigation function ko initialize kiya
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .ph-home-page {
          background:
            radial-gradient(circle at top, rgba(0, 245, 255, 0.08), transparent 45%),
            radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.06), transparent 50%),
            #05060a;
          color: white;
          min-height: 100vh;
          font-family: system-ui, -apple-system, sans-serif;
          padding: 0 0 80px 0;
          box-sizing: border-box;
        }

        .ph-home-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* HERO SECTION REDESIGN */
        .ph-home-hero {
          text-align: center;
          padding: 120px 0 80px 0;
          max-width: 900px;
          margin: 0 auto;
        }

        .ph-home-badge {
          display: inline-block;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          border-radius: 999px;
          border: 1px solid rgba(0, 245, 255, 0.3);
          color: #00f5ff;
          background: rgba(0, 245, 255, 0.03);
          margin-bottom: 24px;
          text-transform: uppercase;
        }

        .ph-home-hero h1 {
          font-size: 56px;
          font-weight: 900;
          line-height: 1.15;
          margin: 0 0 20px 0;
          letter-spacing: -1px;
          color: white;
        }

        @media (max-width: 768px) {
          .ph-home-hero h1 {
            font-size: 40px;
          }
        }

        .ph-home-cyan-glow {
          color: #00f5ff;
          text-shadow: 0 0 25px rgba(0, 245, 255, 0.4);
        }

        .ph-home-hero-desc {
          color: #9ca3af;
          font-size: 18px;
          line-height: 1.6;
          margin: 0 auto;
          max-width: 750px;
        }

        .ph-home-btns-group {
          margin-top: 36px;
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .ph-home-btn {
          padding: 12px 28px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.2s ease;
          border: none;
        }

        .ph-home-btn-primary {
          background: #a855f7;
          color: white;
        }

        .ph-home-btn-primary:hover {
          background: #9333ea;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }

        .ph-home-btn-secondary {
          background: transparent;
          border: 1px solid #00f5ff;
          color: #00f5ff;
        }

        .ph-home-btn-secondary:hover {
          background: #00f5ff;
          color: #05060a;
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.25);
        }

        /* METRICS COUNTERS GRID */
        .ph-home-stats-board {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 50px;
        }

        @media (max-width: 900px) {
          .ph-home-stats-board {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .ph-home-stats-board {
            grid-template-columns: 1fr;
          }
        }

        .ph-home-stat-box {
          background: #0b0f1a;
          border: 1px solid rgba(168, 85, 247, 0.15);
          border-radius: 14px;
          padding: 24px 16px;
          text-align: center;
          transition: border-color 0.3s;
        }

        .ph-home-stat-box:hover {
          border-color: rgba(168, 85, 247, 0.4);
        }

        .ph-home-stat-box h2 {
          color: #00f5ff;
          font-size: 32px;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .ph-home-stat-box p {
          color: #9ca3af;
          font-size: 13.5px;
          margin: 6px 0 0 0;
          font-weight: 500;
        }

        /* MODULE SECTIONS STRUCTURE */
        .ph-home-section {
          padding: 60px 0;
        }

        .ph-home-section-title {
          text-align: center;
          font-size: 32px;
          margin: 0 0 44px 0;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: white;
        }

        .ph-home-cyan-text { color: #00f5ff; }
        .ph-home-purple-text { color: #a855f7; }

        .ph-home-grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        /* RE-DESIGNED HOVER FEATURE CARDS */
        .ph-home-feature-card {
          background: rgba(11, 15, 26, 0.65);
          border: 1px solid rgba(0, 245, 255, 0.12);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          backdrop-filter: blur(10px);
        }

        .ph-home-feature-card:hover {
          transform: translateY(-6px);
          border-color: #00f5ff;
          box-shadow: 0 12px 30px rgba(0, 245, 255, 0.12);
          background: rgba(11, 15, 26, 0.85);
        }

        .ph-home-feature-card h3 {
          color: #00f5ff;
          margin: 0 0 12px 0;
          font-size: 19px;
          font-weight: 700;
        }

        .ph-home-feature-card p {
          color: #9ca3af;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }
      `}</style>

      <div className="ph-home-page">
        <div className="ph-home-container">
          
          {/* HERO ARCHITECTURE */}
          <section className="ph-home-hero">
            <div className="ph-home-badge">Next-Gen Cybersecurity Platform</div>

            <h1>
              AI-Powered <span className="ph-home-cyan-glow">PenHex Security</span> Infrastructure
            </h1>

            <p className="ph-home-hero-desc">
              Advanced cybersecurity ecosystem fusing offensive engineering with artificial intelligence. 
              We identify vulnerabilities, monitor real-time vectors, and automate intelligent defenses 
              before breaches occur.
            </p>

            <div className="ph-home-btns-group">
              <button className="ph-home-btn ph-home-btn-primary">Get Started</button>
              
              {/* 3. Button par onClick listener lagaya jo contact page par bhejega */}
              <button 
                className="ph-home-btn ph-home-btn-secondary" 
                onClick={() => navigate("/contact")}
              >
                Book Security Audit
              </button>
            </div>

            {/* LIVE COUNTERS PANEL */}
            <div className="ph-home-stats-board">
              <div className="ph-home-stat-box">
                <h2>1.2M+</h2>
                <p>Threats Blocked</p>
              </div>

              <div className="ph-home-stat-box">
                <h2>8,932</h2>
                <p>Vulnerabilities Patched</p>
              </div>

              <div className="ph-home-stat-box">
                <h2>320+</h2>
                <p>Infrastructures Secured</p>
              </div>

              <div className="ph-home-stat-box">
                <h2>99.99%</h2>
                <p>Defense Operational</p>
              </div>
            </div>
          </section>

          {/* DYNAMIC CORE SERVICES */}
          <section className="ph-home-section">
            <h2 className="ph-home-section-title">
              Core <span className="ph-home-cyan-text">Security Capabilities</span>
            </h2>

            <div className="ph-home-grid-layout">
              <div className="ph-home-feature-card">
                <h3>Penetration Testing</h3>
                <p>Rigorous web, API, and multi-cloud architectural simulation assessing logic flaws and OWASP vulnerabilities.</p>
              </div>

              <div className="ph-home-feature-card">
                <h3>AI Security Integration</h3>
                <p>Advanced security engineering designed to audit LLMs, block prompt injections, and detect malicious model anomalies.</p>
              </div>

              <div className="ph-home-feature-card">
                <h3>Cloud Cyber Defense</h3>
                <p>Comprehensive IAM configuration audit and policy design ensuring zero-trust isolation on distributed AWS/Cloud infra.</p>
              </div>
            </div>
          </section>

          {/* EXPERT SECURITY PRODUCTS */}
          <section className="ph-home-section">
            <h2 className="ph-home-section-title">
              Automated <span className="ph-home-purple-text">Security Products</span>
            </h2>

            <div className="ph-home-grid-layout">
              <div className="ph-home-feature-card">
                <h3 style={{ color: "#a855f7" }}>NoHashZone</h3>
                <p>Cryptographic testing platform for advanced hash identification and crack simulation analysis.</p>
              </div>

              <div className="ph-home-feature-card">
                <h3 style={{ color: "#a855f7" }}>Vulnerability Scanner</h3>
                <p>Next-gen scanning engine executing real-time threat maps and deep signature detection sweeps.</p>
              </div>

              <div className="ph-home-feature-card">
                <h3 style={{ color: "#a855f7" }}>AI Security Assistant</h3>
                <p>Intelligent cybersecurity model automating compliance reports, analysis tracking, and remediation guides.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default Home;