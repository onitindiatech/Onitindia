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
    { name: "OnIT Campus", target: "OnitCampus", highlight: true },
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
      <div
        className="fixed top-0 left-0 w-full flex justify-between items-center px-6 sm:px-10 h-20 z-[9999] transition-all duration-300 ease-in-out font-sans bg-[#f3f4f6] backdrop-blur-md "
      >
        {/* ================= LOGO ================= */}
        <div className="flex items-center shrink-0">
          <img
            src={logoImage}
            alt="OnIT Logo"
            className="w-32 sm:w-40 md:w-48 object-contain cursor-pointer transition-transform "
            onClick={() => navigate("/")}
          />
        </div>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden md:flex gap-6 absolute left-1/2 transform -translate-x-1/2 items-center">
          {centerNavItems.map((item, index) => {
            const isHighlighted = !!item.highlight;

            return (
              <motion.div
                key={index}
                className="relative cursor-pointer flex flex-col items-center group"
                onClick={() => handleScrollTo(item.target)}
                variants={containerVariants}
                initial="hidden"
                whileHover="visible"
              >
                {/* --- Highlighted Item (ONIT Campus) --- */}
                {isHighlighted ? (
                  <div className="relative flex flex-col items-center mt-2">

                    {/* NEW Badge */}
                    <span className="absolute -top-[12px] right-0 px-1 py-[2px] rounded text-[7px] font-bold tracking-wide uppercase bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm animate-pulse-slow">
                      NEW
                    </span>

                    {/* OnIT Campus (Stylized) */}
                    <div className="text-[17px] font-bold flex items-center ">

                      <span className="text-black">On</span>
                      <span className="text-green-600">IT</span>
                      <span className="text-black ml-1">Campus</span>
                    </div>
                  </div>
                ) : (
                  // --- Regular Item ---
                  <div className="relative">
                    <div className="flex">
                      {item.name.split("").map((char, idx) => (
                        <motion.span
                          key={idx}
                          variants={letterVariants}
                          className="inline-block text-[16px] font-medium text-gray-700 group-hover:text-black transition-colors"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </div>

                  </div>
                )}
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
                  className="inline-block text-[16px] font-medium text-gray-700 group-hover:text-black"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gray-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
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
                  className="inline-block text-[16px] font-medium text-gray-700 group-hover:text-black"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gray-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
          </motion.div>
        </div>
        {/* ================= DESKTOP BUTTONS ================= */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeD90sDCZFts-uu_g_FgfVfG4Qmb1Ixyf0rJI7f-I4y9L6hgA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold pl-6 pr-2 py-2 rounded-full "
          >
            <span className="tracking-wide">Start Posting</span>
            <div className="bg-white/20 rounded-full p-2 group-hover:bg-black group-hover:text-white ">
              <ArrowRight size={16} strokeWidth={2.5} />
            </div>
          </a>
        </div>
        {/* ================= MOBILE MENU BUTTON ================= */}
        <div className="md:hidden z-[1000]">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            {menuOpen ? <X size={28} className="text-black" /> : <Menu size={28} className="text-black" />}
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
              className="absolute top-20 left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col items-center py-8 space-y-6 md:hidden overflow-hidden"
            >
              {centerNavItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleScrollTo(item.target)}
                  className={`relative text-xl font-medium transition-all ${item.highlight
                    ? "text-green-700 font-bold bg-green-50 px-6 py-2 rounded-full"
                    : "text-gray-700 hover:text-black"
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
                className="text-xl font-medium text-gray-700 hover:text-black transition"
              >
                Blog
              </button>

              <button
                onClick={handleTaskPerformer}
                className="text-xl font-medium text-gray-700 hover:text-black transition"
              >
                Join Us
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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