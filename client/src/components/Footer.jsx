import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://onitindia.onrender.com";

function Footer({ onShowPrivacyPolicy }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) {
      alert("Please enter an email");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {

        setEmail("");
      } else {

      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <footer className="w-full bg-[#004d43] text-white pt-10 md:pt-20 pb-10 px-6 md:px-20 relative overflow-hidden rounded-t-[3rem]">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 md:gap-12 relative z-10">
        {/* Left Section: Brand & Newsletter */}
        <div className="w-full lg:w-5/12 space-y-8">
          {/* Brand Tagline */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
              Simplify your life,<br />
              <span className="text-green-300">Start earning.</span>
            </h2>
            <p className="text-zinc-300 text-base leading-relaxed max-w-md">
              <span className="text-black font-bold">On</span><span className="text-green-500 font-bold">IT</span> connects people who need help with those ready to help  instantly, locally, and securely.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-md">
            <div className="flex flex-row items-center gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/10 backdrop-blur-sm transition-all text-sm sm:text-base min-w-0"
              />
              <button
                onClick={handleSubmit}
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-[#004d43] font-bold hover:bg-green-400 hover:text-white transition-all duration-300 shadow-lg shrink-0 whitespace-nowrap text-sm sm:text-base"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Big Text Element */}

        </div>

        {/* Right Section: Links */}
        <div className="w-full lg:w-6/12 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-x-16 justify-items-start">
          {/* Company */}
          <div className="w-full text-left">
            <h3 className="text-sm md:text-lg font-semibold text-green-300 mb-4 md:mb-6 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a href="/#whychooseus" className="text-zinc-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm md:text-base">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#domain" className="text-zinc-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm md:text-base">
                  Domains
                </a>
              </li>
              <li>
                <a href="/campus-detail#campus" className="text-zinc-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm md:text-base">
                  <span className="text-black font-bold">On</span><span className="text-green-500 font-bold">IT</span> Campus
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full text-left">
            <h3 className="text-sm md:text-lg font-semibold text-green-300 mb-4 md:mb-6 uppercase tracking-wider">Support</h3>
            <ul className="space-y-3 md:space-y-4 text-zinc-300">
              <li>
                <Link to="/privacy-policy" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm md:text-base">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm md:text-base">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="w-full text-left col-span-2 md:col-span-1">
            <h3 className="text-sm md:text-lg font-semibold text-green-300 mb-4 md:mb-6 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a href="mailto:support@onitindia.com" className="text-zinc-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 text-sm md:text-base justify-start">
                  <span className="text-lg"><FaEnvelope /></span> support@onitindia.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/onitindia/?viewAsMember=true" className="text-zinc-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 text-sm md:text-base justify-start">
                  <span className="text-lg"><FaLinkedin /></span> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/onitindia?igsh=MXA0emY2MzYybGY4aw==" className="text-zinc-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 text-sm md:text-base justify-start">
                  <span className="text-lg"><FaInstagram /></span> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 my-10 relative z-10"></div>

      {/* Footer Bottom */}
      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 text-sm text-zinc-400 w-full">
        <h1 className="block text-[3rem] md:text-[5rem] lg:text-[7rem] font-black text-white/5 tracking-tighter select-none pointer-events-none leading-none -ml-4">
          #HyperLocal
        </h1>

      </div>
    </footer>
  );
}
export default Footer;