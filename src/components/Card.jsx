import React from "react";

const Cards = ({
  title = "Card Title",
  description = "This is a sample description for the card component.",
  icon = "🔐",
  tag = "SECURITY",
  onClick,
}) => {
  return (
    <>
      <style>{`
        .card {
          position: relative;
          cursor: pointer;
          background: rgba(11, 15, 26, 0.95);
          border: 1px solid rgba(168, 85, 247, 0.18);
          border-radius: 16px;
          padding: 22px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0,0,0,0.35);
          backdrop-filter: blur(10px);
        }

        .card:hover {
          transform: translateY(-6px);
          border-color: rgba(34, 211, 238, 0.5);
          box-shadow: 0 0 25px rgba(34, 211, 238, 0.15);
        }

        .glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at top left,
            rgba(34, 211, 238, 0.12),
            transparent 50%
          ),
          radial-gradient(
            circle at bottom right,
            rgba(168, 85, 247, 0.12),
            transparent 50%
          );
          opacity: 0;
          transition: 0.35s ease;
        }

        .card:hover .glow {
          opacity: 1;
        }

        .content {
          position: relative;
          z-index: 2;
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tag {
          font-size: 11px;
          padding: 5px 10px;
          border-radius: 6px;
          background: rgba(34, 211, 238, 0.08);
          color: #22d3ee;
          border: 1px solid rgba(34, 211, 238, 0.2);
          letter-spacing: 0.5px;
        }

        .icon {
          font-size: 22px;
        }

        .title {
          color: #ffffff;
          font-size: 17px;
          font-weight: 600;
          margin-top: 14px;
        }

        .desc {
          color: #9ca3af;
          font-size: 13px;
          margin-top: 8px;
          line-height: 1.6;
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 18px;
        }

        .learn {
          font-size: 12px;
          color: #6b7280;
          transition: 0.3s ease;
        }

        .card:hover .learn {
          color: #22d3ee;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: #22d3ee;
          border-radius: 50%;
          transition: 0.3s ease;
        }

        .card:hover .dot {
          transform: scale(1.7);
          box-shadow: 0 0 12px #22d3ee;
        }
      `}</style>

      <div className="card" onClick={onClick}>
        <div className="glow"></div>

        <div className="content">

          {/* TOP */}
          <div className="top">
            <span className="tag">{tag}</span>
            <span className="icon">{icon}</span>
          </div>

          {/* TITLE */}
          <div className="title">{title}</div>

          {/* DESCRIPTION */}
          <div className="desc">{description}</div>

          {/* BOTTOM */}
          <div className="bottom">
            <span className="learn">Learn more →</span>
            <span className="dot"></span>
          </div>

        </div>
      </div>
    </>
  );
};

export default Cards;