import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Research", path: "/research" },
    // { name: "Threat Intel", path: "/threat-intel" },
    { name: "Careers", path: "/careers" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="navbar">
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;

          /* BIGGER + MORE PREMIUM HEIGHT */
          padding: 10px 0;

          background: rgba(5, 6, 10, 0.55);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 245, 255, 0.15);
        }

        .container {
          max-width: 1300px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;

          /* MORE HEIGHT */
          padding: 18px 28px;
        }

        /* LOGO (BIGGER + MORE PREMIUM) */
        .logo {
          font-size: 22px;
          font-weight: 900;
          letter-spacing: 1.5px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .logo span:first-child {
          color: #00f5ff;
          text-shadow: 0 0 18px rgba(0,245,255,0.7);
        }

        .logo span:last-child {
          color: white;
        }

        /* NAV LINKS (MORE SPACING + MODERN LOOK) */
        .links {
          display: flex;
          gap: 28px;
          align-items: center;
        }

        .links a {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.3px;
          position: relative;
          transition: all 0.25s ease;
        }

        /* HOVER GLOW EFFECT */
        .links a:hover {
          color: #00f5ff;
          text-shadow: 0 0 12px rgba(0,245,255,0.6);
          transform: translateY(-1px);
        }

        /* UNDERLINE ANIMATION */
        .links a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #00f5ff, #7c3aed);
          transition: 0.3s;
          box-shadow: 0 0 10px rgba(0,245,255,0.6);
        }

        .links a:hover::after {
          width: 100%;
        }

        /* HAMBURGER */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }

        .bar {
          width: 26px;
          height: 2px;
          background: #00f5ff;
          box-shadow: 0 0 10px rgba(0,245,255,0.6);
        }

        /* MOBILE MENU (CLEAN GLASS STYLE) */
        .mobile {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 18px 24px;

          background: rgba(5, 6, 10, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(0,245,255,0.15);
        }

        .mobile a {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 15px;
        }

        .mobile a:hover {
          color: #00f5ff;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .links {
            display: none;
          }
          .hamburger {
            display: flex;
          }
        }
      `}</style>

      <div className="container">

        {/* LOGO */}
        <div className="logo">
          <span>Penhexx</span>
          <span>Security</span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="links">
          {navLinks.map((l, i) => (
            <Link key={i} to={l.path}>
              {l.name}
            </Link>
          ))}
        </div>

        {/* MOBILE ICON */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile">
          {navLinks.map((l, i) => (
            <Link key={i} to={l.path} onClick={() => setMenuOpen(false)}>
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;