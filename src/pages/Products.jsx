import React from "react";

const Products = () => {
  const products = [
    {
      name: "NoHashZone",
      description:
        "Advanced hash analysis and cracking simulation platform for security research.",
      tag: "CRYPTO",
      colorClass: "ph-color-cyan",
    },
    {
      name: "Vulnerability Scanner",
      description:
        "Automated web and API scanning engine for detecting security flaws.",
      tag: "SCAN",
      colorClass: "ph-color-purple",
    },
    {
      name: "Penhexx Vault",
      description:
        "Secure encrypted password manager with AI-based breach detection.",
      tag: "VAULT",
      colorClass: "ph-color-cyan",
    },
    {
      name: "Threat Dashboard",
      description:
        "Real-time global cyber attack visualization and threat intelligence system.",
      tag: "LIVE",
      colorClass: "ph-color-purple",
    },
    {
      name: "AI Security Assistant",
      description:
        "AI-powered cybersecurity chatbot for analysis, guidance, and automation.",
      tag: "AI",
      colorClass: "ph-color-cyan",
    },
  ];

  return (
    <>
      <style>{`
        .ph-prod-page {
          background: #05060a;
          color: white;
          min-height: 100vh;
          padding: 90px 24px;
          font-family: system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
        }

        .ph-prod-container {
          max-width: 1200px;
          margin: auto;
        }

        .ph-prod-hero {
          text-align: center;
          max-width: 800px;
          margin: auto;
        }

        .ph-prod-title {
          font-size: 44px;
          font-weight: 800;
          margin: 0;
          color: white;
        }

        .ph-prod-cyan-glow {
          color: #00f5ff;
          text-shadow: 0 0 18px rgba(0, 245, 255, 0.4);
        }

        .ph-prod-desc {
          margin-top: 18px;
          color: #9ca3af;
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 0;
        }

        .ph-prod-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-top: 60px;
        }

        .ph-prod-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 245, 255, 0.12);
          border-radius: 14px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .ph-prod-card:hover {
          transform: translateY(-6px);
          border-color: #00f5ff;
          box-shadow: 0 10px 25px rgba(0, 245, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
        }

        .ph-prod-tag {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-block;
          margin-bottom: 14px;
          letter-spacing: 0.5px;
        }

        /* Border and Text Color Mapping mapped from data */
        .ph-color-cyan {
          color: #00f5ff;
          border: 1px solid rgba(0, 245, 255, 0.3);
          background: rgba(0, 245, 255, 0.05);
        }

        .ph-color-purple {
          color: #a855f7;
          border: 1px solid rgba(168, 85, 247, 0.3);
          background: rgba(168, 85, 247, 0.05);
        }

        .ph-prod-name {
          font-size: 19px;
          font-weight: 700;
          margin: 0 0 10px 0;
          color: white;
        }

        .ph-prod-text {
          font-size: 13.5px;
          color: #9ca3af;
          line-height: 1.5;
          margin: 0;
        }

        .ph-prod-footer {
          margin-top: 80px;
          text-align: center;
          color: #9ca3af;
          font-size: 14px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      <div className="ph-prod-page">
        <div className="ph-prod-container">
          
          {/* HERO */}
          <div className="ph-prod-hero">
            <h1 className="ph-prod-title">
              Security <span className="ph-prod-cyan-glow">Products</span>
            </h1>
            <p className="ph-prod-desc">
              Explore next-generation cybersecurity tools built for automation,
              intelligence and enterprise-grade protection.
            </p>
          </div>

          {/* GRID */}
          <div className="ph-prod-grid">
            {products.map((p, i) => (
              <div className="ph-prod-card" key={i}>
                <span className={`ph-prod-tag ${p.colorClass}`}>{p.tag}</span>
                <div className="ph-prod-name">{p.name}</div>
                <div className="ph-prod-text">{p.description}</div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="ph-prod-footer">
            Built for secure systems with{" "}
            <span style={{ color: "#a855f7", fontWeight: 500 }}>Penhexx Tools</span>
          </div>

        </div>
      </div>
    </>
  );
};

export default Products;