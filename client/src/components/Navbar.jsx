import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "react-feather";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  // Navigation Items
  const centerNavItems = [
    { name: "Domain", target: "domain" },
    { name: "About Us", target: "whychooseus" },
    { name: "Contact", target: "footer" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } },
  };

  const letterVariants = {
    hidden: { y: 4, opacity: 1 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  };

  // Robust Scroll To Element Logic
  const tryFindElement = (id) => {
    if (!id) return null;
    const candidates = [
      id,
      "Campus",
      "OnitCampus",
      "ONITCampus",
      "onit-campus",
      id.replace(/\s+/g, ""), // remove spaces
      id.toLowerCase(),
    ];
    for (const c of candidates) {
      const el = document.getElementById(c);
      if (el) return el;
    }
    return document.querySelector(`[id*="${id.toLowerCase().replace(/\s/g, "")}"]`);
  };

  const handleScrollTo = (targetId) => {
    setMenuOpen(false);

    if (targetId === "OnitCampus") {
      navigate("/campus-detail#campus");
      return;
    }

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = tryFindElement(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      const el = tryFindElement(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTaskPerformer = () => {
    navigate("/task-performers");
    setMenuOpen(false);
  };

  const handleBlogClick = () => {
    navigate("/blog");
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 sm:px-10 h-16 z-[9999] transition-all duration-300 ease-out ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_4px 24px -4px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]"
            : "bg-white/70 backdrop-blur-xl shadow-[0_1px 3px_rgba(0,0,0,0.04)]"
        }`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent opacity-80" />

        {/* ================= LOGO ================= */}
        <div
          className="flex h-16 sm:h-20 md:h-24 items-center shrink-0 cursor-pointer overflow-hidden transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => navigate("/")}
        >
          <img
            src={logoImage}
            alt="OnIT India Logo"
            className="h-full w-auto max-w-[240px] sm:max-w-[280px] md:max-w-[320px] object-contain object-center"
          />
        </div>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden md:flex gap-6 absolute left-1/2 transform -translate-x-1/2 items-center">
          {centerNavItems.map((item, index) => {
            return (
              <motion.div
                key={index}
                className="relative cursor-pointer flex flex-col items-center group"
                onClick={() => handleScrollTo(item.target)}
                variants={containerVariants}
                initial="hidden"
                whileHover="visible"
              >
                <div className="relative">
                  <div className="flex">
                    {item.name.split("").map((char, idx) => (
                      <motion.span
                        key={idx}
                        variants={letterVariants}
                        className="inline-block text-[15px] font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-200"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </div>
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-primary)] rounded-full group-hover:w-full transition-all duration-300 origin-left" />
                </div>
              </motion.div>
            );
          })}

          {/* Blog Link */}
          <motion.div
            className="relative cursor-pointer group"
            onClick={handleBlogClick}
            variants={containerVariants}
            initial="hidden"
            whileHover="visible"
          >
            <div className="flex">
              {"Blog".split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  variants={letterVariants}
                  className="inline-block text-[15px] font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--color-primary)] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.div>

          {/* Join Us Link */}
          <motion.div
            className="relative cursor-pointer group"
            onClick={handleTaskPerformer}
            variants={containerVariants}
            initial="hidden"
            whileHover="visible"
          >
            <div className="flex">
              {"Join Us".split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  variants={letterVariants}
                  className="inline-block text-[15px] font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--color-primary)] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </motion.div>
        </div>
        {/* ================= DESKTOP BUTTONS ================= */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-[var(--color-primary-subtle)]/50"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="group relative text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-emerald-600 px-6 py-2.5 rounded-full transition-all duration-200 shadow-[0_4px 14px -2px_rgba(5,150,105,0.35)] hover:shadow-[0_6px 20px -2px_rgba(5,150,105,0.4)] hover:-translate-y-0.5"
          >
            <span className="relative z-10">Sign Up</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-primary-hover)] to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </button>
        </div>
        {/* ================= MOBILE MENU BUTTON ================= */}
        <div className="md:hidden z-[1000]">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-[var(--color-border-subtle)] transition"
          >
            {menuOpen ? <X size={28} className="text-[var(--color-text)]" /> : <Menu size={28} className="text-[var(--color-text)]" />}
          </button>
        </div>
        {/* ================= MOBILE DROPDOWN ================= */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl shadow-[0_10px 40px -10px_rgba(0,0,0,0.1)] border-t border-[var(--color-border-subtle)] flex flex-col items-center py-8 space-y-6 md:hidden overflow-hidden"
            >
              {centerNavItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleScrollTo(item.target)}
                  className={`relative text-xl font-medium transition-all ${item.highlight
                    ? "text-[var(--color-primary)] font-bold bg-[var(--color-primary-subtle)] px-6 py-2 rounded-full"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    }`}
                >
                  {item.name}
                  {item.highlight && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                      NEW
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={handleBlogClick}
                className="text-xl font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition"
              >
                Blog
              </button>

              <button
                onClick={handleTaskPerformer}
                className="text-xl font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition"
              >
                Join Us
              </button>

              {/* Mobile Sign In Button */}
              <button
                onClick={() => { navigate("/login"); setMenuOpen(false); }}
                className="text-xl font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition"
              >
                Sign In
              </button>

              {/* Mobile Sign Up Button */}
              <button
                onClick={() => { navigate("/signup"); setMenuOpen(false); }}
                className="text-xl font-semibold text-white bg-gradient-to-r from-[var(--color-primary)] to-emerald-600 px-8 py-3 rounded-full transition shadow-[0_4px 14px -2px_rgba(5,150,105,0.35)] hover:shadow-[0_6px 20px -2px_rgba(5,150,105,0.4)]"
              >
                Sign Up
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Styles for slow pulse animation */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite ease-in-out;
        }
      `}</style>
    </>
  );
}

export default Navbar;