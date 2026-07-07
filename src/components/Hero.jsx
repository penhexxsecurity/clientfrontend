import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6 bg-gradient-to-b from-[#05060a] via-[#0b0f1a] to-[#05060a]">

      <div className="max-w-5xl">

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          NEXT GEN{" "}
          <span className="text-cyan-400 drop-shadow-[0_0_20px_#00f5ff]">
            CYBER SECURITY
          </span>{" "}
          PLATFORM
        </h1>

        {/* SUBTITLE */}
        <p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed">
          Advanced threat intelligence, AI-driven defense systems, and real-time
          security analytics for modern digital infrastructure.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          <button className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-lg shadow-lg shadow-cyan-400/30 hover:scale-105 transition">
            Explore Platform
          </button>

          <button className="px-6 py-3 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition">
            View Research
          </button>

        </div>

        {/* PULSE DOT */}
        <div className="mt-10 flex justify-center">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_#00f5ff]" />
        </div>

      </div>
    </section>
  );
};

export default Hero;