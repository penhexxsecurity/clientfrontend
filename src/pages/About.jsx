import React from "react";

const About = () => {
  return (
    <>
      <style>{`
        .ph-abt-page {
          background: #05060a;
          color: white;
          min-height: 100vh;
          padding: 90px 24px;
          font-family: system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
        }

        .ph-abt-container {
          max-width: 1200px;
          margin: auto;
        }

        /* HERO ARCHITECTURE */
        .ph-abt-hero-section {
          text-align: center;
          max-width: 850px;
          margin: auto;
        }

        .ph-abt-main-title {
          font-size: 48px;
          font-weight: 900;
          letter-spacing: -0.5px;
          margin: 0;
          color: white;
        }

        .ph-abt-cyan-glow {
          color: #00f5ff;
          text-shadow: 0 0 18px rgba(0, 245, 255, 0.4);
        }

        .ph-abt-hero-desc {
          margin-top: 20px;
          color: #9ca3af;
          font-size: 17px;
          line-height: 1.7;
          margin-bottom: 0;
        }

        /* MULTI-COLUMN CONFIGURATIONS */
        .ph-abt-grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 60px;
        }

        .ph-abt-vision-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 245, 255, 0.15);
          padding: 28px;
          border-radius: 14px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          backdrop-filter: blur(10px);
          position: relative;
        }

        .ph-abt-vision-card:hover {
          transform: translateY(-6px);
          border-color: #00f5ff;
          box-shadow: 0 10px 25px rgba(0, 245, 255, 0.15);
        }

        .ph-abt-card-heading {
          font-size: 22px;
          font-weight: 700;
          color: #00f5ff;
          margin: 0;
        }

        .ph-abt-card-text {
          margin-top: 12px;
          color: #9ca3af;
          line-height: 1.6;
          font-size: 14.5px;
        }

        /* EXPERTISE EXTRA FIELDS GRID */
        .ph-abt-expertise-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-top: 40px;
        }

        .ph-abt-exp-card {
          background: #0b0f1a;
          border: 1px solid rgba(168, 85, 247, 0.15);
          padding: 20px;
          border-radius: 12px;
          transition: border-color 0.2s;
        }

        .ph-abt-exp-card:hover {
          border-color: rgba(168, 85, 247, 0.4);
        }

        .ph-abt-exp-card h4 {
          margin: 0 0 8px 0;
          color: white;
          font-size: 16px;
          font-weight: 700;
        }

        .ph-abt-exp-card p {
          margin: 0;
          color: #9ca3af;
          font-size: 13px;
          line-height: 1.5;
        }

        /* CENTER HEADINGS WRAPPER */
        .ph-abt-center-wrapper {
          text-align: center;
          margin-top: 100px;
        }

        .ph-abt-sub-heading {
          font-size: 32px;
          font-weight: 800;
          margin: 0;
          color: white;
          letter-spacing: -0.5px;
        }

        /* EXECUTIVE LEVEL STRATIFICATION HIERARCHY */
        .ph-abt-founder-top-row {
          display: flex;
          justify-content: center;
          margin-top: 40px;
          margin-bottom: 24px;
        }

        /* Centered Leadership Profiles Spec */
        .ph-abt-leader-profile-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 245, 255, 0.15);
          padding: 32px 24px 84px 24px; /* Room at bottom for email bar */
          border-radius: 14px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          backdrop-filter: blur(10px);
          position: relative;
          text-align: center; /* Centers all child headers and content text */
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ph-abt-leader-profile-card:hover {
          transform: translateY(-6px);
          border-color: #00f5ff;
          box-shadow: 0 10px 25px rgba(0, 245, 255, 0.15);
        }

        .ph-abt-top-leader-card {
          max-width: 500px;
          width: 100%;
          border: 1px solid rgba(168, 85, 247, 0.3);
          background: linear-gradient(145deg, rgba(11,15,26,0.6), rgba(5,6,10,0.4));
        }

        .ph-abt-top-leader-card:hover {
          border-color: #a855f7;
          box-shadow: 0 10px 25px rgba(168, 85, 247, 0.15);
        }

        .ph-abt-founder-role {
          color: #a855f7;
          font-size: 12px;
          font-weight: 700;
          margin-top: 6px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .ph-abt-team-three-column-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 968px) {
          .ph-abt-team-three-column-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .ph-abt-team-three-column-row {
            grid-template-columns: 1fr;
          }
        }

        /* LINKEDIN TOP RIGHT ANCHOR */
        .ph-abt-ln-top-right {
          position: absolute;
          top: 24px;
          right: 24px;
          color: #9ca3af;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .ph-abt-ln-top-right:hover {
          color: #00f5ff;
          transform: scale(1.1);
        }

        .ph-abt-top-leader-card .ph-abt-ln-top-right:hover {
          color: #a855f7;
        }

        /* BOTTOM CENTER EMAIL BUTTON BAR */
        .ph-abt-email-center-btn {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%); /* Locks exactly in the center grid */
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(0, 245, 255, 0.04);
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 6px;
          color: #00f5ff;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          max-width: 90%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: all 0.2s ease;
        }

        .ph-abt-email-center-btn:hover {
          background: rgba(0, 245, 255, 0.1);
          border-color: #00f5ff;
          box-shadow: 0 0 12px rgba(0, 245, 255, 0.2);
        }

        .ph-abt-top-leader-card .ph-abt-email-center-btn {
          color: #a855f7;
          border-color: rgba(168, 85, 247, 0.3);
          background: rgba(168, 85, 247, 0.04);
        }

        .ph-abt-top-leader-card .ph-abt-email-center-btn:hover {
          background: rgba(168, 85, 247, 0.1);
          border-color: #a855f7;
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.2);
        }

        /* ACHIEVEMENTS METRICS METADATA */
        .ph-abt-stats-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        .ph-abt-stat-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 245, 255, 0.15);
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .ph-abt-stat-box:hover {
          transform: scale(1.04);
          border-color: #00f5ff;
          box-shadow: 0 8px 20px rgba(0, 245, 255, 0.15);
        }

        .ph-abt-stat-num {
          font-size: 30px;
          font-weight: 800;
          color: #00f5ff;
          letter-spacing: -0.5px;
        }

        .ph-abt-stat-text {
          margin-top: 8px;
          color: #9ca3af;
          font-size: 13.5px;
          font-weight: 500;
        }
      `}</style>

      <div className="ph-abt-page">
        <div className="ph-abt-container">

          {/* HERO CONTEXT */}
          <div className="ph-abt-hero-section">
            <h1 className="ph-abt-main-title">
              About <span className="ph-abt-cyan-glow">PenHex Security</span>
            </h1>
            <p className="ph-abt-hero-desc">
              PenHex Security is an innovative cybersecurity and AI-driven technology startup dedicated to 
              securing the digital world through advanced offensive security, intelligent automation, and 
              next-generation cyber defense solutions. We focus on identifying vulnerabilities before attackers 
              can exploit them, developing proactive armor for modern infrastructure.
            </p>
          </div>

          {/* CORE STRATEGIC PILLARS */}
          <div className="ph-abt-grid-layout">
            <div className="ph-abt-vision-card">
              <div className="ph-abt-card-heading">⚡ Our Mission</div>
              <div className="ph-abt-card-text">
                To combine advanced cybersecurity techniques with Artificial Intelligence to create smart, 
                scalable, and automated defense systems that allow modern enterprises to detect threat anomalies, 
                analyze complex vulnerabilities, and prevent zero-day attacks in real time.
              </div>
            </div>

            <div className="ph-abt-vision-card">
              <div className="ph-abt-card-heading">🌍 Our Vision</div>
              <div className="ph-abt-card-text">
                To make advanced cyber defense architecture more accessible, proactive, and innovation-driven, 
                shaping the global transition toward autonomous and highly resilient digital ecosystems that outsmart adversaries.
              </div>
            </div>
          </div>

          {/* CORE ARCHITECTURAL EXPERTISE */}
          <div className="ph-abt-center-wrapper" style={{ marginTop: "80px" }}>
            <div className="ph-abt-sub-heading">
              💡 Technical <span className="ph-abt-cyan-glow">Expertise Matrix</span>
            </div>

            <div className="ph-abt-expertise-grid">
              <div className="ph-abt-exp-card">
                <h4>🕵️ Offensive Hacking</h4>
                <p>Advanced full-scope network penetration testing, API auditing, and breach simulation tracking.</p>
              </div>
              <div className="ph-abt-exp-card">
                <h4>🤖 AI Protection</h4>
                <p>Auditing large language models, mitigating prompt injection, and scaling smart defense anomaly models.</p>
              </div>
              <div className="ph-abt-exp-card">
                <h4>☁️ Cloud & Web Security</h4>
                <p>Deploying ironclad zero-trust validation, serverless isolation vectors, and robust IAM role evaluations.</p>
              </div>
              <div className="ph-abt-exp-card">
                <h4>🔎 Digital Forensics</h4>
                <p>Rapid incident root-cause response tracking, artifact isolation, and deep threat intel synthesis.</p>
              </div>
            </div>
          </div>

          {/* SYSTEMATIC LEADERSHIP HIERARCHY MAP */}
          <div className="ph-abt-center-wrapper">
            <div className="ph-abt-sub-heading">
              Executive <span className="ph-abt-cyan-glow">Leadership Board</span>
            </div>

            {/* LEVEL 01: ELEVATED FOUNDER CARD (CENTERED WITH TOP RIGHT LINKEDIN) */}
            <div className="ph-abt-founder-top-row">
              <div className="ph-abt-leader-profile-card ph-abt-top-leader-card">
                {/* LinkedIn Icon restored on Top Right Corner */}
                <a href="https://www.linkedin.com/in/kaushiktushar/" target="_blank" rel="noreferrer" className="ph-abt-ln-top-right" title="Connect on LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>

                <div className="ph-abt-card-heading" style={{ fontSize: "24px" }}>Tushar Kaushik</div>
                <div className="ph-abt-founder-role">CEO & Founder</div>
                <div className="ph-abt-card-text" style={{ fontSize: "15px" }}>
                  Directing core platform visions, offensive security research paradigms, strategic integration parameters, 
                  and scaling PenHex enterprise deployments worldwide.
                </div>
                
                {/* Email Center Button with Text Visible on UI */}
                <a href="mailto:contact@penhexxsecurity.com" className="ph-abt-email-center-btn" title="Send Email to Tushar">
                  <span>tushar@penhexxsecurity.com</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>

            {/* LEVEL 02: SYMMETRIC 3-COLUMN LEADS ROW (CENTERED WITH TOP RIGHT LINKEDIN) */}
            <div className="ph-abt-team-three-column-row">
              {/* CTO */}
              <div className="ph-abt-leader-profile-card">
                <a href="https://www.linkedin.com/in/sumityadav7090/" target="_blank" rel="noreferrer" className="ph-abt-ln-top-right" title="Connect on LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>

                <div className="ph-abt-card-heading">Sumit Yadav</div>
                <div className="ph-abt-founder-role">Co-Founder & CTO</div>
                <div className="ph-abt-card-text">
                  Orchestrating production backends, system engineering paths, database constraints, and scalable automation engines.
                </div>
                
                <a href="mailto:sumit@penhexxsecurity.com" className="ph-abt-email-center-btn" title="Send Email to Sumit">
                  <span>sumit@penhexxsecurity.com</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>

              {/* CSO */}
              <div className="ph-abt-leader-profile-card">
                <a href="https://www.linkedin.com/in/kirten-dubey/" target="_blank" rel="noreferrer" className="ph-abt-ln-top-right" title="Connect on LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>

                <div className="ph-abt-card-heading">Kirten Dubey</div>
                <div className="ph-abt-founder-role">Co-Founder & CSO</div>
                <div className="ph-abt-card-text">
                  Managing active live event threat feeds, continuous defense analytics, and operational compliance policies.
                </div>
                
                <a href="mailto:kirten@penhexxsecurity.com" className="ph-abt-email-center-btn" title="Send Email to Kirten">
                  <span>kirten@penhexxsecurity.com</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>

              {/* CPO */}
              <div className="ph-abt-leader-profile-card">
                <a href="https://www.linkedin.com/in/shivam-kushwaha-a2b8652a5/" target="_blank" rel="noreferrer" className="ph-abt-ln-top-right" title="Connect on LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>

                <div className="ph-abt-card-heading">Shivam Kushwah</div>
                <div className="ph-abt-founder-role">Co-Founder & Blockchain Developer</div>
                <div className="ph-abt-card-text">
                  Directing frontend interface behaviors, platform ergonomics, client product roadmaps, and lifecycle sprints.
                </div>
                
                <a href="mailto:shivam@penhexxsecurity.com" className="ph-abt-email-center-btn" title="Send Email to Shivam">
                  <span>shivam@penhexxsecurity.com</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>
          </div>

          {/* METRIC AUTHENTICATION LABELS */}
          <div className="ph-abt-center-wrapper">
            <div className="ph-abt-sub-heading">
              Certifications & <span className="ph-abt-cyan-glow">Technical Rank</span>
            </div>

            <div className="ph-abt-stats-layout">
              <div className="ph-abt-stat-box">
                <div className="ph-abt-stat-num">CEH</div>
                <div className="ph-abt-stat-text">Certified Ethical Hacker Operations</div>
              </div>

              <div className="ph-abt-stat-box">
                <div className="ph-abt-stat-num">250+</div>
                <div className="ph-abt-stat-text">PortSwigger Lab Architectures Cleared</div>
              </div>

              <div className="ph-abt-stat-box">
                <div className="ph-abt-stat-num">60+</div>
                <div className="ph-abt-stat-text">HackTheBox Machines Neutralized</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;
