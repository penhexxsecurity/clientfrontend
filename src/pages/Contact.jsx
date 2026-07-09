import React, { useState } from "react";

const Contact = () => {
  // Active Form Tab state ('general' ya 'enterprise')
  const [activeTab, setActiveTab] = useState("general");
  
  // Submission spinner / pending transaction tracking state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CUSTOM HUD MODAL STATE TRIGGERS
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // FORM STATE EXPANSION (Added phone, website, service)
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",       
    website: "",     
    service: "web-app", 
    clientId: "", 
    severity: "high", // Synchronized default fallback with enterprise_routes backend triage
    message: "",
  });

  // ERRORS STATE FOR REAL-TIME VALIDATION
  const [errors, setErrors] = useState({});

  // OWASP COMPLIANT INPUT SANITIZATION
  const sanitizeInput = (val) => {
    if (typeof val !== "string") return "";
    return val
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  // REPETITIVE PATTERN DETECTION (Anti-DoS/Anti-Spam Filter)
  const hasRepetitiveContent = (text) => {
    const structuralRepetition = /(.)\1{14,}/; 
    if (structuralRepetition.test(text)) return true;

    const wordRepetition = /(\b\w+\b)(.*\b\1\b){5,}/i;
    return wordRepetition.test(text);
  };

  // CENTRALIZED VALIDATION FUNCTION
  const validateField = (name, value) => {
    let errorMsg = "";
    const cleanValue = value.trim();

    // Prevent empty or whitespace-only submissions globally across required inputs
    if (["name", "company", "email", "phone", "website", "message"].includes(name) || (name === "clientId" && activeTab === "enterprise")) {
      if (!cleanValue) {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be left empty or contain only spaces.`;
      }
    }

    switch (name) {
      case "name":
        if (cleanValue.length > 70) errorMsg = "Name cannot exceed 70 characters.";
        else if (!/^[a-zA-Z\s.\-]+$/.test(cleanValue)) errorMsg = "Name contains unallowed structural characters.";
        break;
      case "company":
        if (cleanValue.length > 100) errorMsg = "Organization name cannot exceed 100 characters.";
        break;
      case "email":
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (cleanValue.length > 254) {
          errorMsg = "Email length exceeds global standard limits.";
        } else if (!emailRegex.test(cleanValue)) {
          errorMsg = "Invalid email format (e.g., name@domain.com)";
        }
        break;
      case "phone":
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        const strippedPhone = cleanValue.replace(/[\s()-]/g, "");
        if (!phoneRegex.test(strippedPhone)) {
          errorMsg = "Phone must be 10–15 digits (optional + prefix)";
        }
        break;
      case "website":
        if (cleanValue.length > 200) {
          errorMsg = "URL length cannot exceed 200 characters.";
        } else {
          try {
            new URL(cleanValue.startsWith("http") ? cleanValue : `https://${cleanValue}`);
          } catch (_) {
            errorMsg = "Please enter a valid URL (e.g., https://example.com)";
          }
        }
        break;
      case "clientId":
        if (activeTab === "enterprise") {
          if (cleanValue.length > 30) errorMsg = "Client ID Key structure is too long.";
          else if (!/^[a-zA-Z0-9\-]+$/.test(cleanValue)) errorMsg = "Invalid characters detected in Client ID Key.";
        }
        break;
      case "message":
        if (cleanValue.length > 3000) {
          errorMsg = `Message body exceeds maximum size constraints (${cleanValue.length}/3000).`;
        } else if (hasRepetitiveContent(cleanValue)) {
          errorMsg = "Submission blocked: Highly repetitive content or suspicious pattern detected.";
        }
        break;
      default:
        break;
    }

    return errorMsg;
  };

  // REAL-TIME VALIDATION (ONCHANGE)
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // HANDLES INBOUND TAB CHANGING AND CLEARS PRIOR TIERS ERROR BADGES
  const handleTabSwitch = (targetTab) => {
    setActiveTab(targetTab);
    setErrors({});
  };

  // ASYNCHRONOUS API DISPATCH HANDLER (CONNECTS TO FLASK BACKEND)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentErrors = {};
    Object.keys(form).forEach((key) => {
      // Skip validating unrelated fields based on current route domain partition
      if (activeTab === "general" && (key === "clientId" || key === "severity")) return;
      if (activeTab === "enterprise" && key === "service") return;
      
      const error = validateField(key, form[key]);
      if (error) currentErrors[key] = error;
    });

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      alert("⚠️ Please fix the highlighted errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Dynamic Endpoint Selection targeting your backend blueprint architecture
      const targetEndpoint = activeTab === "enterprise" 
        ? "https://backend-gitignore.onrender.com/api/enterprise/submit"
        : "https://backend-gitignore.onrender.com/api/general/submit";

      // Formulate pure schema structural payload to align exactly with backend expectation models
      const payload = {
        name: sanitizeInput(form.name.trim()),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim().replace(/[\s()-]/g, ""),
        company: sanitizeInput(form.company.trim()),
        website: form.website.trim(),
        message: sanitizeInput(form.message.trim()),
        ...(activeTab === "general" && { service: form.service }),
        ...(activeTab === "enterprise" && { clientId: form.clientId.trim(), severity: form.severity })
      };

      const response = await fetch(targetEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok || responseData.success === false) {
        throw new Error(responseData.message || responseData.error || "Server transaction rejected");
      }

      // Capture structured data cache parameters along with tracking tokens for Modal popup hydration
      setSubmittedData({
        ...payload,
        trackingId: responseData.query_id || responseData.incident_id || "PHX-TRACK-PENDING",
        timestamp: new Date().toLocaleString(),
        route: activeTab
      });

      // Show Custom HUD Container overlay instead of alert blocking
      setShowModal(true);

      // Reset Form State Elements cleanly across DOM elements
      setForm({
        name: "",
        email: "",
        company: "",
        phone: "",       
        website: "",     
        service: "web-app", 
        clientId: "", 
        severity: "high",
        message: "",
      });
      
      e.target.reset();

    } catch (apiError) {
      console.error("PenHex Network Layer Pipeline Failure:", apiError);
      alert(`❌ Dispatch Transmission Failed:\n${apiError.message || "Unable to reach security gateway backend."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ASYNCHRONOUS TARGET DOWNLOAD PIPE HANDLER FOR INVOICE COMPILATION
  const handleDownloadPDF = async () => {
    if (!submittedData) return;
    try {
      const targetSubPath = submittedData.route === "enterprise" ? "enterprise" : "general";
      
      const res = await fetch(`https://final-client-backend.onrender.com//api/${targetSubPath}/generate-invoice-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedData),
      });
      
      if (!res.ok) throw new Error("Could not initialize file download payload binary");
      
      const blob = await res.blob();
      const fileObjectURL = window.URL.createObjectURL(blob);
      
      const dynamicLink = document.createElement("a");
      dynamicLink.href = fileObjectURL;
      dynamicLink.download = `PenHex_Receipt_${submittedData.trackingId}.pdf`;
      document.body.appendChild(dynamicLink);
      dynamicLink.click();
      dynamicLink.remove();
      window.URL.revokeObjectURL(fileObjectURL);
    } catch (err) {
      console.error("PDF Pipeline Error:", err);
      alert(`❌ PDF Generation Pipeline Failed:\n${err.message}`);
    }
  };

  // RED BORDER HIGHLIGHTING
  const getInputStyle = (fieldName, baseStyle = {}) => {
    if (errors[fieldName]) {
      return {
        ...baseStyle,
        borderColor: "#ef4444",
        boxShadow: "0 0 10px rgba(239, 68, 68, 0.25)",
      };
    }
    return baseStyle;
  };

  return (
    <>
      <style>{`
        .ph-con-page {
          min-height: 100vh;
          background: 
            radial-gradient(circle at top, rgba(0,245,255,0.08), transparent 42%),
            radial-gradient(circle at bottom, rgba(124,58,237,0.08), transparent 50%),
            #05060a;
          color: white;
          padding: 100px 24px 80px 24px;
          font-family: system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
        }

        .ph-con-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* HERO AREA */
        .ph-con-hero {
          text-align: center;
          max-width: 800px;
          margin: auto;
        }

        .ph-con-hero h1 {
          font-size: 46px;
          font-weight: 900;
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }

        .ph-con-cyan-glow {
          color: #00f5ff;
          text-shadow: 0 0 20px rgba(0, 245, 255, 0.4);
        }

        .ph-con-hero p {
          color: #9ca3af;
          font-size: 16px;
          line-height: 1.6;
          margin: 0;
        }

        /* DUAL LAYOUT GRID */
        .ph-con-main-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 32px;
          margin-top: 50px;
        }

        @media (max-width: 968px) {
          .ph-con-main-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        /* CARD */
        .ph-con-card {
          background: rgba(11, 15, 26, 0.75);
          border: 1px solid rgba(0, 245, 255, 0.15);
          border-radius: 14px;
          padding: 32px;
          backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .ph-con-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0, 245, 255, 0.3);
          box-shadow: 0 10px 25px rgba(0, 245, 255, 0.08);
        }

        /* TAB SWITCHER STYLING */
        .ph-con-tab-box {
          display: flex;
          background: #040609;
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 8px;
          padding: 4px;
          margin-bottom: 28px;
          gap: 4px;
        }

        .ph-con-tab-btn {
          flex: 1;
          padding: 10px;
          background: transparent;
          border: none;
          color: #9ca3af;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
          text-align: center;
        }

        .ph-con-tab-btn-active-general {
          background: rgba(0, 245, 255, 0.08);
          color: #00f5ff;
          border: 1px solid rgba(0, 245, 255, 0.2);
        }

        .ph-con-tab-btn-active-enterprise {
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        /* FORM ELEMENTS */
        .ph-con-form-group {
          margin-bottom: 18px;
        }

        .ph-con-form-group label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ph-con-input, .ph-con-select, .ph-con-textarea {
          width: 100%;
          padding: 12px 14px;
          background: #040609;
          border: 1px solid rgba(168, 85, 247, 0.25);
          border-radius: 8px;
          color: white;
          outline: none;
          font-size: 14px;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }

        .ph-con-input:focus, .ph-con-select:focus, .ph-con-textarea:focus {
          border-color: #00f5ff;
          box-shadow: 0 0 10px rgba(0, 245, 255, 0.15);
        }

        .ph-con-enterprise-mode input:focus, .ph-con-enterprise-mode textarea:focus, .ph-con-enterprise-mode select:focus {
          border-color: #ef4444;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.15);
        }

        .ph-con-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 14px;
        }

        .ph-con-select option {
          background: #0b0f1a;
          color: white;
        }

        .ph-con-submit-btn {
          width: 100%;
          padding: 14px;
          background: #a855f7;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 8px;
        }

        .ph-con-submit-btn:hover:not(:disabled) {
          background: #9333ea;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }

        .ph-con-submit-btn-emergency {
          background: #ef4444;
        }

        .ph-con-submit-btn-emergency:hover:not(:disabled) {
          background: #dc2626;
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
        }

        .ph-con-submit-btn:disabled {
          background: #374151;
          color: #9ca3af;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* SIDEBAR CONTACT BLOCKS */
        .ph-con-info-block {
          margin-bottom: 32px;
        }

        .ph-con-info-block:last-child {
          margin-bottom: 0;
        }

        .ph-con-info-heading {
          color: #00f5ff;
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 6px 0;
        }

        .ph-con-info-text {
          color: #9ca3af;
          font-size: 13px;
          line-height: 1.5;
          margin: 0 0 10px 0;
        }

        .ph-con-email-link {
          font-size: 15px;
          color: white;
          font-weight: 600;
        }

        /* CLOSING CTA BRACKET */
        .ph-con-footer-cta {
          text-align: center;
          margin-top: 80px;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .ph-con-footer-cta h2 {
          font-size: 26px;
          font-weight: 800;
          margin: 0 0 8px 0;
        }

        .ph-con-purple-glow {
          color: #a855f7;
          text-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
        }

        .ph-con-footer-cta p {
          color: #6b7280;
          margin: 0;
          font-size: 14px;
        }

        .ph-con-error-text {
          color: #ef4444;
          font-size: 12px;
          margin-top: 5px;
          display: block;
          font-weight: 500;
        }

        /* OVERLAY HUD MODAL INTERFACE STRUCTURE */
        .ph-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(3, 4, 7, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }
        .ph-modal-wrapper {
          background: #0b0f1a;
          border: 2px solid #00f5ff;
          box-shadow: 0 0 30px rgba(0, 245, 255, 0.25);
          max-width: 600px;
          width: 100%;
          border-radius: 12px;
          padding: 28px;
          color: white;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        .ph-modal-wrapper-enterprise {
          border-color: #ef4444;
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.25);
        }
        .ph-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 14px;
          margin-bottom: 20px;
        }
        .ph-modal-title {
          font-size: 20px;
          font-weight: 800;
          color: #00f5ff;
          margin: 0;
        }
        .ph-modal-title-enterprise {
          color: #ef4444;
        }
        .ph-modal-close-btn {
          background: transparent;
          border: none;
          color: #9ca3af;
          font-size: 24px;
          cursor: pointer;
          line-height: 1;
        }
        .ph-modal-close-btn:hover {
          color: #ef4444;
        }
        .ph-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
          background: #040609;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .ph-details-grid strong {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 2px;
          letter-spacing: 0.5px;
        }
        .ph-detail-item {
          font-size: 14px;
          line-height: 1.5;
        }
        .ph-detail-full {
          grid-column: span 2;
        }
        .ph-modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        .ph-btn-download {
          flex: 2;
          padding: 14px;
          background: #00f5ff;
          color: #05060a;
          border: none;
          border-radius: 6px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .ph-btn-download:hover {
          background: #00c8ff;
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.4);
        }
        .ph-btn-download-enterprise {
          background: #ef4444;
          color: white;
        }
        .ph-btn-download-enterprise:hover {
          background: #dc2626;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
        }
        .ph-btn-dismiss {
          flex: 1;
          padding: 14px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ph-btn-dismiss:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .ph-con-char-counter {
          display: block;
          text-align: right;
          font-size: 11px;
          color: #6b7280;
          margin-top: 4px;
        }
      `}</style>

      <div className="ph-con-page">
        <div className="ph-con-container">

          {/* HERO SECTION */}
          <div className="ph-con-hero">
            <h1>
              Contact <span className="ph-con-cyan-glow">PenHexx Security</span>
            </h1>
            <p>
              Secure transmission hub built for general communication, business alignment, 
              and priority incident escalation management.
            </p>
          </div>

          {/* MAIN INTERACTIVE AREA */}
          <div className="ph-con-main-grid">

            {/* FORM CONTAINER WITH BALANCED CONDITIONAL FIELDS */}
            <div className={`ph-con-card ${activeTab === "enterprise" ? "ph-con-enterprise-mode" : ""}`}>
              
              {/* TAB SWITCHER BAR */}
              <div className="ph-con-tab-box">
                <button 
                  type="button"
                  className={`ph-con-tab-btn ${activeTab === "general" ? "ph-con-tab-btn-active-general" : ""}`}
                  onClick={() => handleTabSwitch("general")}
                  disabled={isSubmitting}
                >
                  General Business Query
                </button>
                <button 
                  type="button"
                  className={`ph-con-tab-btn ${activeTab === "enterprise" ? "ph-con-tab-btn-active-enterprise" : ""}`}
                  onClick={() => handleTabSwitch("enterprise")}
                  disabled={isSubmitting}
                >
                  Enterprise Client Emergency 
                </button>
              </div>

              {/* CORE CONDITIONAL FORMS INPUT LAYER */}
              <form onSubmit={handleSubmit} noValidate>
                <div className="ph-con-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    className="ph-con-input"
                    style={getInputStyle("name")}
                    placeholder="E.g., John Doe"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    maxLength={75}
                    required
                  />
                  {errors.name && <span className="ph-con-error-text">{errors.name}</span>}
                </div>

                <div className="ph-con-form-group">
                  <label>Official Business Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    className="ph-con-input"
                    style={getInputStyle("email")}
                    placeholder="name@company.com"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    maxLength={255}
                    required
                  />
                  {errors.email && <span className="ph-con-error-text">{errors.email}</span>}
                </div>

                <div className="ph-con-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    className="ph-con-input"
                    style={getInputStyle("phone")}
                    placeholder="+1 (555) 000-0000"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    maxLength={20}
                    required
                  />
                  {errors.phone && <span className="ph-con-error-text">{errors.phone}</span>}
                </div>

                <div className="ph-con-form-group">
                  <label>Website / Application URL</label>
                  <input
                    type="url"
                    name="website"
                    value={form.website}
                    className="ph-con-input"
                    style={getInputStyle("website")}
                    placeholder="https://yourwebsite.com"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    maxLength={210}
                    required
                  />
                  {errors.website && <span className="ph-con-error-text">{errors.website}</span>}
                </div>

                <div className="ph-con-form-group">
                  <label>Organization / Company</label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    className="ph-con-input"
                    style={getInputStyle("company")}
                    placeholder="Company Name"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    maxLength={105}
                    required
                  />
                  {errors.company && <span className="ph-con-error-text">{errors.company}</span>}
                </div>

                {/* DYNAMIC SERVICE REQUIRED DROPDOWN */}
                {activeTab === "general" && (
                  <div className="ph-con-form-group">
                    <label>Service Required</label>
                    <select 
                      name="service" 
                      value={form.service}
                      className="ph-con-select"
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      <option value="web-app">1. Web Application Security Testing Plans</option>
                      <option value="api-security">2. API Security Testing Plans</option>
                      <option value="cloud-assessment">3. Cloud Security Assessment Plans</option>
                      <option value="penhexx-360">4. Penhexx 360 Security Suite (Combo Plans)</option>
                      <option value="awareness-training">5. Security Awareness Training</option>
                    </select>
                  </div>
                )}

                {/* CONDITIONAL INJECTION FOR EXISTING CLIENTS */}
                {activeTab === "enterprise" ? (
                  <>
                    <div className="ph-con-form-group">
                      <label style={{ color: "#ef4444" }}>PenHex Client ID Key</label>
                      <input
                        type="text"
                        name="clientId"
                        value={form.clientId}
                        className="ph-con-input"
                        style={getInputStyle("clientId", { borderColor: "rgba(239, 68, 68, 0.4)" })}
                        placeholder="PHX-XXXX-XXXX"
                        onChange={handleChange}
                        disabled={isSubmitting}
                        maxLength={35}
                        required
                      />
                      {errors.clientId && <span className="ph-con-error-text">{errors.clientId}</span>}
                    </div>

                    <div className="ph-con-form-group">
                      <label style={{ color: "#ef4444" }}>Emergency Priority Level</label>
                      <select 
                        name="severity" 
                        value={form.severity}
                        className="ph-con-select"
                        style={{ borderColor: "rgba(239, 68, 68, 0.4)" }}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      >
                        <option value="high">High - Infrastructure Anomaly Detected</option>
                        <option value="critical">Critical - Service Downtime / Potential Breach 🔥</option>
                      </select>
                    </div>
                  </>
                ) : null}

                <div className="ph-con-form-group">
                  <label>{activeTab === "enterprise" ? "Incident Parameters / Description" : "Project Description / Scope"}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    className="ph-con-textarea"
                    style={getInputStyle("message")}
                    rows="5"
                    placeholder={activeTab === "enterprise" ? "Specify system paths, error logs, or observed vector anomalies regarding the breach context..." : "Describe your verification security audit requirements or product specifications context..."}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    maxLength={3050}
                    required
                  />
                  <span className="ph-con-char-counter">{form.message.length} / 3000 chars</span>
                  {errors.message && <span className="ph-con-error-text">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className={`ph-con-submit-btn ${activeTab === "enterprise" ? "ph-con-submit-btn-emergency" : ""}`}
                  disabled={isSubmitting || Object.values(errors).some(x => x)}
                >
                  {isSubmitting 
                    ? "Processing Secure Transmission..." 
                    : activeTab === "enterprise" 
                      ? "🚨 Trigger Emergency Dispatch Paging" 
                      : "Submit Secure Request"
                  }
                </button>
              </form>

            </div>

            {/* SIDEBAR OPERATIONAL COORDINATES */}
            <div className="ph-con-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px" }}>
              <div className="ph-con-info-block">
                <h3 className="ph-con-info-heading">Emergency Security Node</h3>
                <p className="ph-con-info-text">
                  Monitored 24/7/365 for active threat escalations, high severity incidents, or critical bug disclosures.
                </p>
                <div className="ph-con-email-link">security@penhexx.com</div>
              </div>

              <div className="ph-con-info-block" style={{ borderTop: "1px dashed rgba(0, 245, 255, 0.15)", paddingTop: "20px" }}>
                <h3 className="ph-con-info-heading">Corporate Inquiries</h3>
                <p className="ph-con-info-text">
                  For service integrations, partnership alignments, products access, or business metrics scaling.
                </p>
                <div className="ph-con-email-link">contact@penhexx.com</div>
              </div>
            </div>

          </div>

          {/* FOOT PANEL */}
          <div className="ph-con-footer-cta">
            <h2>
              Secure Your Infrastructure with <span className="ph-con-purple-glow">PenHex Security</span>
            </h2>
            <p>All message parameters are scanned and processed by our active dispatch filters within 24 hours.</p>
          </div>

        </div>
      </div>

      {/* DYNAMIC CONFIRMATION MODAL INTERFACE */}
      {showModal && submittedData && (
        <div className="ph-modal-backdrop">
          <div className={`ph-modal-wrapper ${submittedData.route === "enterprise" ? "ph-modal-wrapper-enterprise" : ""}`}>
            <div className="ph-modal-header">
              <h3 className={`ph-modal-title ${submittedData.route === "enterprise" ? "ph-modal-title-enterprise" : ""}`}>
                {submittedData.route === "enterprise" ? "🚨 Emergency Dispatch Logged" : "🚀 Transmission Pipeline Active"}
              </h3>
              <button className="ph-modal-close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="ph-details-grid">
              <div className="ph-detail-item"><strong>Tracking ID</strong>{submittedData.trackingId}</div>
              <div className="ph-detail-item"><strong>Timestamp</strong>{submittedData.timestamp}</div>
              <div className="ph-detail-item"><strong>Client Node Name</strong>{submittedData.name}</div>
              <div className="ph-detail-item"><strong>Organization Name</strong>{submittedData.company}</div>
              <div className="ph-detail-item"><strong>Email Identifier</strong>{submittedData.email}</div>
              <div className="ph-detail-item"><strong>Phone Coordinate</strong>{submittedData.phone}</div>
              
              {submittedData.route === "general" ? (
                <div className="ph-detail-item ph-detail-full"><strong>Selected Service Blueprint</strong>{submittedData.service}</div>
              ) : (
                <>
                  <div className="ph-detail-item"><strong>PenHex Client Key</strong>{submittedData.clientId}</div>
                  <div className="ph-detail-item"><strong>Severity Core Triage</strong>{submittedData.severity.toUpperCase()}</div>
                </>
              )}
              
              <div className="ph-detail-item ph-detail-full"><strong>Scope Context Parameters</strong>{submittedData.message}</div>
            </div>

            <div className="ph-modal-actions">
              <button className={`ph-btn-download ${submittedData.route === "enterprise" ? "ph-btn-download-enterprise" : ""}`} onClick={handleDownloadPDF}>
                📄 Download Secure PDF Invoice
              </button>
              <button className="ph-btn-dismiss" onClick={() => setShowModal(false)}>Close Node</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
