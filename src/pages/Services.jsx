import React, { useState } from "react";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const offensive = [
    {
      title: "Web Application Pentesting",
      desc: "Identify OWASP Top 10 vulnerabilities in web applications.",
      details:
        "We perform deep manual + automated testing to uncover SQL Injection, XSS, CSRF, authentication flaws, business logic bugs, and insecure configurations.",
      includes: [
        "OWASP Top 10 Testing",
        "Manual Code Review",
        "Burp Suite Analysis",
        "Exploit Proof-of-Concepts",
      ],
      usecase:
        "Secure banking apps, SaaS platforms, and enterprise portals before attackers exploit them.",
    },
    {
      title: "API Security Testing",
      desc: "Test authentication, authorization, and API logic flaws.",
      details:
        "We analyze REST/GraphQL APIs for broken authentication, IDOR, mass assignment, and rate-limit bypass issues.",
      includes: [
        "JWT Testing",
        "Auth Bypass Checks",
        "Rate Limit Testing",
        "GraphQL Security Review",
      ],
      usecase:
        "Protect mobile apps, microservices, and backend APIs from data leaks.",
    },
    {
      title: "Red Team Operations",
      desc: "Simulated real-world attacks to test enterprise defenses.",
      details:
        "We simulate advanced persistent threats including phishing, lateral movement, privilege escalation, and stealth persistence.",
      includes: [
        "Phishing Simulation",
        "Lateral Movement",
        "Privilege Escalation",
        "SOC Evasion Testing",
      ],
      usecase:
        "Evaluate real-world readiness of enterprise security teams.",
    },
    {
      title: "Bug Bounty Simulation",
      desc: "Controlled ethical hacking for vulnerability discovery.",
      details:
        "We simulate bug bounty environments to discover vulnerabilities before attackers do.",
      includes: [
        "Vulnerability Scanning",
        "Exploit Validation",
        "Severity Reporting",
        "Fix Recommendations",
      ],
      usecase:
        "Improve security posture before launching products publicly.",
    },
  ];

  const defensive = [
    {
      title: "SOC Monitoring",
      desc: "24/7 security operations center monitoring and alerts.",
      details:
        "We continuously monitor logs, network traffic, and system behavior to detect anomalies in real-time.",
      includes: [
        "SIEM Integration",
        "Log Analysis",
        "Alert System Setup",
        "Threat Intelligence Feed",
      ],
      usecase:
        "Detect and respond to attacks before damage occurs.",
    },
    {
      title: "Incident Response",
      desc: "Rapid response to security breaches and cyber attacks.",
      details:
        "We provide structured incident handling from detection to recovery and post-incident analysis.",
      includes: [
        "Forensic Analysis",
        "Containment Strategy",
        "Recovery Planning",
        "Root Cause Analysis",
      ],
      usecase:
        "Minimize damage during active cyber attacks.",
    },
    {
      title: "Threat Detection",
      desc: "AI-powered anomaly detection and threat analysis.",
      details:
        "We use behavioral analytics and machine learning to detect abnormal activity patterns.",
      includes: [
        "AI Detection Models",
        "Behavior Tracking",
        "Alert Correlation",
        "Risk Scoring",
      ],
      usecase:
        "Identify hidden threats inside networks.",
    },
    {
      title: "Digital Forensics",
      desc: "Investigate cyber incidents and trace attack origins.",
      details:
        "We perform deep forensic investigations on compromised systems and networks.",
      includes: [
        "Disk Forensics",
        "Memory Analysis",
        "Log Reconstruction",
        "Attack Timeline Mapping",
      ],
      usecase:
        "Trace attackers and recover digital evidence.",
    },
  ];

  const cloud = [
    {
      title: "AWS Security Audit",
      desc: "Comprehensive AWS infrastructure security analysis.",
      details:
        "We inspect AWS services for misconfigurations, exposed buckets, insecure IAM policies, and weak network rules.",
      includes: [
        "S3 Security Review",
        "IAM Audit",
        "EC2 Hardening",
        "CloudTrail Analysis",
      ],
      usecase:
        "Secure cloud infrastructure from misconfigurations.",
    },
    {
      title: "IAM Role Review",
      desc: "Identify privilege escalation and misconfiguration risks.",
      details:
        "We analyze identity and access management policies to ensure least privilege enforcement.",
      includes: [
        "Role Mapping",
        "Permission Analysis",
        "Privilege Escalation Checks",
      ],
      usecase:
        "Prevent unauthorized access to cloud resources.",
    },
    {
      title: "Cloud Architecture Review",
      desc: "Secure design validation for cloud-native systems.",
      details:
        "We evaluate architecture patterns to ensure scalability and security alignment.",
      includes: [
        "Architecture Mapping",
        "Security Layer Review",
        "Network Segmentation",
        "Compliance Checks",
      ],
      usecase:
        "Build secure cloud-native applications from design stage.",
    },
  ];

  const ai = [
    {
      title: "AI Threat Detection",
      desc: "Detect AI-based cyber threats using ML models.",
      details:
        "We build detection models to identify AI-driven attacks like automated phishing and anomaly generation.",
      includes: [
        "ML Threat Models",
        "Pattern Detection",
        "Behavioral AI Analysis",
      ],
      usecase:
        "Protect AI systems from adversarial attacks.",
    },
    {
      title: "Prompt Injection Testing",
      desc: "Security testing for LLM and AI vulnerabilities.",
      details:
        "We test AI models against prompt injection, data leakage, and jailbreak attacks.",
      includes: [
        "LLM Pen Testing",
        "Prompt Filtering Tests",
        "Data Leak Analysis",
      ],
      usecase:
        "Secure chatbots and AI assistants.",
    },
    {
      title: "AI Risk Analysis",
      desc: "Automated assessment of AI system security risks.",
      details:
        "We evaluate AI models for bias, vulnerability, and misuse risks.",
      includes: [
        "Risk Scoring",
        "Model Evaluation",
        "Security Benchmarking",
      ],
      usecase:
        "Ensure safe deployment of AI systems.",
    },
  ];

  const Card = ({ title, desc, onClick }) => (
    <div className="ph-card" onClick={onClick}>
      <h3 className="ph-card-title">{title}</h3>
      <p className="ph-card-desc">{desc}</p>
    </div>
  );

  return (
    <>
      <style>{`
        .ph-page-wrapper {
          background: #05060a;
          color: white;
          min-height: 100vh;
          padding: 80px 24px;
          font-family: system-ui;
        }

        .ph-content-container {
          max-width: 1400px;
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .ph-hero-section {
          text-align: center;
        }

        .ph-main-heading {
          font-size: 42px;
          font-weight: 800;
        }

        .ph-cyan-glow {
          color: #00f5ff;
        }

        .ph-services-board {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 1200px) {
          .ph-services-board {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 680px) {
          .ph-services-board {
            grid-template-columns: 1fr;
          }
        }

        .ph-board-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ph-column-header {
          font-weight: 800;
        }

        .ph-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(0,245,255,0.1);
          border-radius: 12px;
          padding: 18px;
          cursor: pointer;
        }

        .ph-card-title {
          color: #00f5ff;
        }

        .ph-card-desc {
          color: #9ca3af;
          font-size: 13px;
        }

        .ph-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ph-modal {
          width: 520px;
          max-width: 90%;
          background: #0b0f1a;
          padding: 24px;
          border-radius: 14px;
          border: 1px solid rgba(0,245,255,0.2);
        }

        .ph-modal-title {
          color: #00f5ff;
          font-size: 22px;
        }

        .ph-modal-category {
          color: #a855f7;
          font-size: 13px;
        }

        .ph-btn {
          margin-top: 12px;
          padding: 10px 18px;
          background: #a855f7;
          border: none;
          color: white;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>

      <div className="ph-page-wrapper">
        <div className="ph-content-container">

          <div className="ph-hero-section">
            <h1 className="ph-main-heading">
              Our <span className="ph-cyan-glow">Security Services</span>
            </h1>
          </div>

          <div className="ph-services-board">

            {[offensive, defensive, cloud, ai].map((group, gi) => {
              const titles = ["Offensive Security", "Defensive Security", "Cloud Security", "AI Security"];

              return (
                <div className="ph-board-column" key={gi}>
                  <div className="ph-column-header">{titles[gi]}</div>

                  {group.map((item, i) => (
                    <Card
                      key={i}
                      {...item}
                      onClick={() => setSelectedService({ category: titles[gi], ...item })}
                    />
                  ))}
                </div>
              );
            })}

          </div>

          {selectedService && (
            <div
              className="ph-modal-overlay"
              onClick={() => setSelectedService(null)}
            >
              <div className="ph-modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="ph-modal-title">{selectedService.title}</h2>
                <p className="ph-modal-category">{selectedService.category}</p>

                <p style={{ color: "#9ca3af", marginTop: 10 }}>
                  {selectedService.details}
                </p>

                <div style={{ marginTop: 10 }}>
                  <h4 style={{ color: "#fff" }}>Includes:</h4>
                  <ul style={{ color: "#9ca3af", fontSize: 13 }}>
                    {selectedService.includes.map((i, idx) => (
                      <li key={idx}>• {i}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 10 }}>
                  <h4 style={{ color: "#fff" }}>Use Case:</h4>
                  <p style={{ color: "#9ca3af", fontSize: 13 }}>
                    {selectedService.usecase}
                  </p>
                </div>

                <button className="ph-btn" onClick={() => setSelectedService(null)}>
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Services;