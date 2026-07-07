import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleBookAudit = () => {
    navigate("/contact?tab=enterprise");
  };

  return (
    <>
      <style>{`
        .ph-foot-section {
          background: #05060a;
          color: #d1d5db;
          border-top: 1px solid rgba(0, 245, 255, 0.2);
          margin-top: auto;
          font-family: system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
          width: 100%;
        }

        .ph-foot-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        @media (max-width: 968px) {
          .ph-foot-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 540px) {
          .ph-foot-container {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .ph-foot-brand h1 {
          font-size: 24px;
          font-weight: 700;
          color: white;
          letter-spacing: 1px;
          margin: 0;
        }

        .ph-foot-cyan {
          color: #00f5ff;
          text-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
        }

        .ph-foot-brand-desc {
          font-size: 13.5px;
          color: #9ca3af;
          line-height: 1.6;
          margin: 16px 0 0 0;
        }

        .ph-foot-social-links {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .ph-foot-social-links a {
          color: #9ca3af;
          font-size: 13.5px;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .ph-foot-social-links a:hover {
          color: #00f5ff;
        }

        .ph-foot-col-title {
          color: white;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 16px 0;
          letter-spacing: 0.5px;
        }

        .ph-foot-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .ph-foot-links-list li {
          font-size: 13.5px;
          color: #9ca3af;
          margin-bottom: 10px;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .ph-foot-cyan-hover li:hover {
          color: #00f5ff;
        }

        .ph-foot-purple-hover li:hover {
          color: #a855f7;
        }

        .ph-foot-contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 13.5px;
          color: #9ca3af;
        }

        .ph-foot-contact-list li {
          margin-bottom: 10px;
          line-height: 1.4;
        }

        .ph-foot-btn {
          margin-top: 16px;
          padding: 10px 20px;
          background: #00f5ff;
          border: none;
          border-radius: 6px;
          color: #05060a;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(0, 245, 255, 0.2);
        }

        .ph-foot-btn:hover {
          background: #00d5dd;
          box-shadow: 0 6px 20px rgba(0, 245, 255, 0.4);
          transform: translateY(-1px);
        }

        .ph-foot-bottom-bar {
          border-top: 1px solid rgba(0, 245, 255, 0.08);
          margin-top: 40px;
          padding: 24px;
          text-align: center;
          font-size: 13px;
          color: #6b7280;
        }
      `}</style>

      <footer className="ph-foot-section">
        <div className="ph-foot-container">

          <div className="ph-foot-brand">
            <h1>
              Penhexx <span className="ph-foot-cyan">Security</span>
            </h1>

            <p className="ph-foot-brand-desc">
              AI-powered cybersecurity infrastructure built for modern digital systems.
              We protect applications, networks, and cloud environments with advanced security intelligence.
            </p>

            <div className="ph-foot-social-links">
              <a>LinkedIn</a>
              <a>GitHub</a>
              <a>Twitter</a>
            </div>
          </div>

          <div>
            <h2 className="ph-foot-col-title">Services</h2>
            <ul className="ph-foot-links-list ph-foot-cyan-hover">
              <li>Penetration Testing</li>
              <li>Red Teaming</li>
              <li>Cloud Security</li>
              <li>API Security</li>
              <li>AI Security</li>
              <li>Incident Response</li>
            </ul>
          </div>

          <div>
            <h2 className="ph-foot-col-title">Products</h2>
            <ul className="ph-foot-links-list ph-foot-purple-hover">
              <li>NoHashZone</li>
              <li>Vulnerability Scanner</li>
              <li>Password Vault</li>
              <li>Threat Dashboard</li>
              <li>AI Security Assistant</li>
            </ul>
          </div>

          <div>
            <h2 className="ph-foot-col-title">Contact</h2>

            <ul className="ph-foot-contact-list">
              <li>Email: contact@penhexx.com</li>
              <li>Security: security@penhexx.com</li>
              <li>Location: India</li>
            </ul>

            <button
              className="ph-foot-btn"
              onClick={handleBookAudit}
            >
              Book Security Audit
            </button>
          </div>

        </div>

        <div className="ph-foot-bottom-bar">
          © {new Date().getFullYear()} Penhexx Security. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;