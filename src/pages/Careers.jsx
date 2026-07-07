import React, { useState } from "react";

const Careers = () => {
  // Modal State Control
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Success modal visibility control state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    employmentType: "",
    experience: "",
    github: "",
    linkedin: "",
    resumeLink: "",
    coverLetter: "",
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

  // ANTI-DOS REPETITIVE TEXT BLOCKING FILTER
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

    // Prevent empty or whitespace-only submissions for required fields
    if (["fullName", "email", "phone", "employmentType", "experience", "resumeLink"].includes(name)) {
      if (!cleanValue) {
        return `${name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} cannot be left empty or contain only spaces.`;
      }
    }

    switch (name) {
      case "fullName":
        if (cleanValue.length > 70) errorMsg = "Full Name cannot exceed 70 characters.";
        else if (!/^[a-zA-Z\s.\-]+$/.test(cleanValue)) errorMsg = "Name contains unallowed structural characters.";
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
          errorMsg = "Phone must be 10–15 digits (optional + prefix).";
        }
        break;
      case "github":
      case "linkedin":
      case "resumeLink":
        if (cleanValue.length > 200) {
          errorMsg = "URL string cannot exceed 200 characters.";
        } else if (cleanValue.length > 0) {
          try {
            new URL(cleanValue.startsWith("http") ? cleanValue : `https://${cleanValue}`);
          } catch (_) {
            errorMsg = "Please enter a valid absolute URL hierarchy path.";
          }
        }
        break;
      case "coverLetter":
        if (cleanValue.length > 2000) {
          errorMsg = `Statement exceeds maximum size constraints (${cleanValue.length}/2000).`;
        } else if (hasRepetitiveContent(cleanValue)) {
          errorMsg = "Submission blocked: Highly repetitive text patterns detected.";
        }
        break;
      default:
        break;
    }

    return errorMsg;
  };

  const handleApplyClick = (jobTitle) => {
    setSelectedJob(jobTitle);
    setErrors({});
    setIsOpen(true);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    setIsOpen(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      employmentType: "",
      experience: "",
      github: "",
      linkedin: "",
      resumeLink: "",
      coverLetter: "",
    });
    setErrors({});
  };

  // REAL-TIME VALIDATION UPON INPUT CHANGING
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // API Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) currentErrors[key] = error;
    });

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      alert("⚠️ Please fix the highlighted verification errors before transmitting.");
      return;
    }

    setIsSubmitting(true);

    // Formulate pure sanitized schema structural payload mapping
    const payload = {
      jobRole: selectedJob,
      fullName: sanitizeInput(formData.fullName.trim()),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim().replace(/[\s()-]/g, ""),
      employmentType: formData.employmentType,
      experience: formData.experience,
      github: formData.github.trim() ? formData.github.trim() : null,
      linkedin: formData.linkedin.trim() ? formData.linkedin.trim() : null,
      resumeLink: formData.resumeLink.trim(),
      coverLetter: sanitizeInput(formData.coverLetter.trim())
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/general/careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Close main application form and display custom success popup modal
        handleClose();
        setShowSuccessModal(true);
      } else {
        console.error("❌ Backend Error Response Payload Matrix:", result);
        throw new Error(result.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("❌ Strategic Submission Error Tracer:", error);
      alert(`❌ Submission Failed:\n${error.message || "Something went wrong while saving your application."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // HIGHLIGHT INPUT FIELDS UPON INVALID DATA DETECTION
  const getInputStyle = (fieldName) => {
    let baseStyle = {};
    if (errors[fieldName]) {
      baseStyle = {
        borderColor: "#ef4444",
        boxShadow: "0 0 8px rgba(239, 68, 68, 0.25)",
      };
    }
    return baseStyle;
  };

  return (
    <>
      <style>{`
        /* PAGE BASE */
        .ph-car-page {
          background: #05060a;
          color: white;
          min-height: 100vh;
          padding: 80px 24px;
          font-family: system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
        }

        .ph-car-container {
          max-width: 1200px;
          margin: auto;
        }

        /* HERO SECTION */
        .ph-car-hero {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .ph-car-title {
          font-size: 44px;
          font-weight: 800;
          margin: 0;
          color: white;
        }

        .ph-car-cyan {
          color: #00f5ff;
          text-shadow: 0 0 18px rgba(0, 245, 255, 0.4);
        }

        .ph-car-desc {
          color: #9ca3af;
          margin-top: 24px;
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 0;
        }

        /* WHY JOIN US GRID */
        .ph-car-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-top: 64px;
        }

        .ph-car-why-card {
          background: #0b0f1a;
          border: 1px solid rgba(168, 85, 247, 0.2);
          padding: 24px;
          border-radius: 14px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .ph-car-why-card:hover {
          border-color: #00f5ff;
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 245, 255, 0.1);
        }

        .ph-car-card-heading {
          color: #00f5ff;
          font-weight: 700;
          font-size: 18px;
          margin: 0 0 12px 0;
        }

        .ph-car-card-text {
          color: #9ca3af;
          font-size: 13.5px;
          line-height: 1.5;
          margin: 0;
        }

        /* OPEN POSITIONS */
        .ph-car-positions-section {
          margin-top: 80px;
        }

        .ph-car-section-heading {
          font-size: 32px;
          font-weight: 800;
          text-align: center;
          margin: 0 0 40px 0;
          color: white;
        }

        .ph-car-purple {
          color: #a855f7;
        }

        .ph-car-jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        @media (max-width: 900px) {
          .ph-car-jobs-grid {
            grid-template-columns: 1fr;
          }
        }

        .ph-car-job-card {
          background: #0b0f1a;
          border: 1px solid rgba(168, 85, 247, 0.2);
          padding: 28px;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .ph-car-job-title {
          font-size: 20px;
          font-weight: 700;
          color: white;
          margin: 0 0 8px 0;
        }

        .ph-car-job-desc {
          color: #9ca3af;
          font-size: 13.5px;
          line-height: 1.5;
          margin: 0 0 20px 0;
        }

        .ph-car-purple-btn {
          padding: 10px 20px;
          background: #a855f7;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          align-self: flex-start;
          transition: background 0.2s ease;
        }

        .ph-car-purple-btn:hover {
          background: #7c3aed;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.35);
        }

        /* INTERNSHIP WRAPPER */
        .ph-car-internship-wrapper {
          margin-top: 80px;
          text-align: center;
          padding: 40px 24px;
          background: rgba(0, 245, 255, 0.02);
          border: 1px solid rgba(0, 245, 255, 0.1);
          border-radius: 16px;
        }

        .ph-car-cyan-btn {
          margin-top: 28px;
          padding: 12px 28px;
          background: #00f5ff;
          border: none;
          border-radius: 8px;
          color: #05060a;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ph-car-cyan-btn:hover {
          background: #00d5dd;
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.35);
        }

        /* FOOTER BRANDING */
        .ph-car-footer-cta {
          margin-top: 80px;
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .ph-car-footer-cta h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }

        .ph-car-footer-note {
          color: #6b7280;
          margin-top: 8px;
          font-size: 13.5px;
        }

        /* APPLICATION MODAL & FORM STYLES */
        .ph-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(5, 6, 10, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          box-sizing: border-box;
        }

        .ph-modal-content {
          background: #0b0f1a;
          border: 1px solid rgba(0, 245, 255, 0.2);
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 32px;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 245, 255, 0.05);
          box-sizing: border-box;
        }

        .ph-modal-content::-webkit-scrollbar {
          width: 6px;
        }

        .ph-modal-content::-webkit-scrollbar-thumb {
          background: #a855f7;
          border-radius: 10px;
        }

        .ph-modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          color: #9ca3af;
          font-size: 24px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .ph-modal-close-btn:hover {
          color: #ff4a4a;
        }

        .ph-form-group {
          margin-bottom: 20px;
        }

        .ph-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .ph-form-grid {
            grid-template-columns: 1fr;
          }
        }

        .ph-form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #e5e7eb;
        }

        .ph-form-input {
          width: 100%;
          background: #111827;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 12px;
          color: white;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }

        .ph-form-input:focus {
          border-color: #00f5ff;
        }

        .ph-form-select {
          width: 100%;
          background: #111827;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 12px;
          color: white;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
        }

        .ph-submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #a855f7 0%, #00f5ff 100%);
          border: none;
          border-radius: 8px;
          color: #05060a;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
          transition: transform 0.2s, opacity 0.2s;
        }

        .ph-submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .ph-submit-btn:not(:disabled):hover {
          transform: translateY(-2px);
          opacity: 0.95;
        }

        /* DESTRUCTIVE ACTION WARNING HOOKS */
        .ph-validation-err-msg {
          color: #ef4444;
          font-size: 12px;
          margin-top: 5px;
          display: block;
          font-weight: 500;
        }

        .ph-char-limit-badge {
          display: block;
          text-align: right;
          font-size: 11px;
          color: #6b7280;
          margin-top: 4px;
        }

        /* CUSTOM SUCCESS MODAL STYLE */
        .ph-success-icon-container {
          width: 64px;
          height: 64px;
          background: rgba(0, 245, 255, 0.1);
          border: 2px solid #00f5ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.2);
        }

        .ph-success-tick {
          color: #00f5ff;
          font-size: 32px;
          font-weight: bold;
          line-height: 1;
        }

        .ph-success-close-btn {
          margin-top: 24px;
          padding: 12px 32px;
          background: #a855f7;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ph-success-close-btn:hover {
          background: #7c3aed;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
        }
      `}</style>

      <div className="ph-car-page">
        <div className="ph-car-container">
          
          {/* Hero Section */}
          <div className="ph-car-hero">
            <h1 className="ph-car-title">Join <span className="ph-car-cyan">Penhexx Security</span></h1>
            <p className="ph-car-desc">Build the future of cybersecurity with us. We are looking for passionate security researchers, developers, and AI engineers.</p>
          </div>

          {/* Why Join Us */}
          <div className="ph-car-why-grid">
            <div className="ph-car-why-card">
              <div className="ph-car-card-heading">Real-World Impact</div>
              <p className="ph-car-card-text">Work on real cybersecurity systems and AI tools.</p>
            </div>
            <div className="ph-car-why-card">
              <div className="ph-car-card-heading">Research Driven</div>
              <p className="ph-car-card-text">Explore CVEs, exploit development, and advanced systems.</p>
            </div>
            <div className="ph-car-why-card">
              <div className="ph-car-card-heading">Startup Culture</div>
              <p className="ph-car-card-text">Fast-paced environment with freedom to innovate.</p>
            </div>
          </div>

          {/* Open Positions */}
          <div className="ph-car-positions-section">
            <h2 className="ph-car-section-heading">Open <span className="ph-car-purple">Positions</span></h2>
            <div className="ph-car-jobs-grid">
              
              <div className="ph-car-job-card">
                <div>
                  <div className="ph-car-job-title">Security Analyst</div>
                  <p className="ph-car-job-desc">Analyze vulnerabilities and assist in threat detection.</p>
                </div>
                <button className="ph-car-purple-btn" onClick={() => handleApplyClick("Security Analyst")}>Apply Now</button>
              </div>

              <div className="ph-car-job-card">
                <div>
                  <div className="ph-car-job-title">Penetration Tester</div>
                  <p className="ph-car-job-desc">Perform ethical hacking and vulnerability assessments.</p>
                </div>
                <button className="ph-car-purple-btn" onClick={() => handleApplyClick("Penetration Tester")}>Apply Now</button>
              </div>

              <div className="ph-car-job-card">
                <div>
                  <div className="ph-car-job-title">AI Security Engineer</div>
                  <p className="ph-car-job-desc">Build AI-based security tools and automation engines.</p>
                </div>
                <button className="ph-car-purple-btn" onClick={() => handleApplyClick("AI Security Engineer")}>Apply Now</button>
              </div>

              <div className="ph-car-job-card">
                <div>
                  <div className="ph-car-job-title">Frontend Developer</div>
                  <p className="ph-car-job-desc">Build futuristic UI dashboards and cyber-themed interfaces.</p>
                </div>
                <button className="ph-car-purple-btn" onClick={() => handleApplyClick("Frontend Developer")}>Apply Now</button>
              </div>

            </div>
          </div>

          {/* Internship Section */}
          <div className="ph-car-internship-wrapper">
            <h2 className="ph-car-section-heading" style={{ marginBottom: "12px" }}>Internship <span className="ph-car-cyan">Programs</span></h2>
            <p className="ph-car-card-text" style={{ fontSize: "15px" }}>Learn cybersecurity and real-world penetration testing with hands-on projects.</p>
            <button className="ph-car-cyan-btn" onClick={() => handleApplyClick("Cybersecurity Intern")}>Apply for Internship</button>
          </div>

          {/* Footer CTA */}
          <div className="ph-car-footer-cta">
            <h3>Build Your Career in <span className="ph-car-purple">Cybersecurity</span></h3>
            <div className="ph-car-footer-note">Join Penhexx Security and shape the future of digital defense.</div>
          </div>

        </div>
      </div>

      {/* APPLICATION MODAL FORM */}
      {isOpen && (
        <div className="ph-modal-overlay" onClick={handleClose}>
          <div className="ph-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="ph-modal-close-btn" onClick={handleClose} disabled={isSubmitting}>&times;</button>
            <h2 style={{ margin: "0 0 8px 0", fontSize: "24px", color: "white" }}>Apply for <span className="ph-car-cyan">{selectedJob}</span></h2>
            <p style={{ margin: "0 0 24px 0", color: "#9ca3af", fontSize: "14px" }}>Please fill out the details below to submit your application to Penhexx Security.</p>

            <form onSubmit={handleSubmit}>
              
              <div className="ph-form-group">
                <label className="ph-form-label">Full Name *</label>
                <input type="text" name="fullName" className="ph-form-input" style={getInputStyle("fullName")} required value={formData.fullName} onChange={handleChange} placeholder="John Doe" disabled={isSubmitting} maxLength={75} />
                {errors.fullName && <span className="ph-validation-err-msg">{errors.fullName}</span>}
              </div>

              <div className="ph-form-grid">
                <div className="ph-form-group">
                  <label className="ph-form-label">Email Address *</label>
                  <input type="email" name="email" className="ph-form-input" style={getInputStyle("email")} required value={formData.email} onChange={handleChange} placeholder="john@example.com" disabled={isSubmitting} maxLength={255} />
                  {errors.email && <span className="ph-validation-err-msg">{errors.email}</span>}
                </div>
                <div className="ph-form-group">
                  <label className="ph-form-label">Phone Number *</label>
                  <input type="tel" name="phone" className="ph-form-input" style={getInputStyle("phone")} required value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" disabled={isSubmitting} maxLength={20} />
                  {errors.phone && <span className="ph-validation-err-msg">{errors.phone}</span>}
                </div>
              </div>

              <div className="ph-form-group">
                <label className="ph-form-label">What are you applying for? *</label>
                <select name="employmentType" className="ph-form-select" style={getInputStyle("employmentType")} required value={formData.employmentType} onChange={handleChange} disabled={isSubmitting}>
                  <option value="" disabled>Select Job Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract Based">Contract Based</option>
                </select>
                {errors.employmentType && <span className="ph-validation-err-msg">{errors.employmentType}</span>}
              </div>

              <div className="ph-form-group">
                <label className="ph-form-label">Experience Level *</label>
                <select name="experience" className="ph-form-select" style={getInputStyle("experience")} required value={formData.experience} onChange={handleChange} disabled={isSubmitting}>
                  <option value="" disabled>Select your experience</option>
                  <option value="Fresher / Student">Fresher / Student</option>
                  <option value="1-2 Years">1-2 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
                {errors.experience && <span className="ph-validation-err-msg">{errors.experience}</span>}
              </div>

              <div className="ph-form-grid">
                <div className="ph-form-group">
                  <label className="ph-form-label">GitHub / Portfolio Link</label>
                  <input type="url" name="github" className="ph-form-input" style={getInputStyle("github")} value={formData.github} onChange={handleChange} placeholder="https://github.com/..." disabled={isSubmitting} maxLength={210} />
                  {errors.github && <span className="ph-validation-err-msg">{errors.github}</span>}
                </div>
                <div className="ph-form-group">
                  <label className="ph-form-label">LinkedIn Profile</label>
                  <input type="url" name="linkedin" className="ph-form-input" style={getInputStyle("linkedin")} value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." disabled={isSubmitting} maxLength={210} />
                  {errors.linkedin && <span className="ph-validation-err-msg">{errors.linkedin}</span>}
                </div>
              </div>

              <div className="ph-form-group">
                <label className="ph-form-label">Resume Link (Google Drive / Dropbox) *</label>
                <input type="url" name="resumeLink" className="ph-form-input" style={getInputStyle("resumeLink")} required value={formData.resumeLink} onChange={handleChange} placeholder="https://drive.google.com/..." disabled={isSubmitting} maxLength={210} />
                {errors.resumeLink && <span className="ph-validation-err-msg">{errors.resumeLink}</span>}
              </div>

              <div className="ph-form-group">
                <label className="ph-form-label">Why do you want to join Penhexx? (Short Note)</label>
                <textarea 
                  name="coverLetter" 
                  className="ph-form-input" 
                  rows="3" 
                  value={formData.coverLetter} 
                  onChange={handleChange} 
                  placeholder="Tell us about your interest..." 
                  disabled={isSubmitting} 
                  maxLength={2050}
                  style={{ ...getInputStyle("coverLetter"), resize: "vertical" }}
                ></textarea>
                <span className="ph-char-limit-badge">{formData.coverLetter.length} / 2000 chars</span>
                {errors.coverLetter && <span className="ph-validation-err-msg">{errors.coverLetter}</span>}
              </div>

              <button type="submit" className="ph-submit-btn" disabled={isSubmitting || Object.values(errors).some(x => x)}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>

            </form>
          </div>
        </div>
      )}

      {/* APP APPLICATION SUBMITTED SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="ph-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="ph-modal-content" style={{ maxWidth: "450px", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            
            <div className="ph-success-icon-container">
              <span className="ph-success-tick">&#10003;</span>
            </div>

            <h2 style={{ margin: "0 0 12px 0", fontSize: "24px", color: "white" }}>
              Application <span className="ph-car-cyan">Submitted!</span>
            </h2>
            
            <p style={{ margin: "0", color: "#9ca3af", fontSize: "14px", lineHeight: "1.6" }}>
              Your application has been submitted successfully. Our hiring team will review your profile and reach out to you soon.
            </p>

            <button className="ph-success-close-btn" onClick={() => setShowSuccessModal(false)}>
              Got it, Thanks!
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default Careers;