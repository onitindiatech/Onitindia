import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUpLong } from "react-icons/fa6";

function Landingpage() {
  const alternates = [
    ["Task.", "Time."],
    ["Help.", "Fast."],
  ];

  const [activeSet, setActiveSet] = useState(0);
  const [registerCount, setRegisterCount] = useState(0);
  const [pinCount, setPinCount] = useState(0);

  // Alternate text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSet((prev) => (prev + 1) % alternates.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Counter animations
  useEffect(() => {
    // Registered Users counter (10 → 450)
    let regInterval = setInterval(() => {
      setRegisterCount((prev) => {
        if (prev < 450) return prev + 10;
        clearInterval(regInterval);
        return prev;
      });
    }, 40);

    // Pin Code counter (1 → 4)
    let pinInterval = setInterval(() => {
      setPinCount((prev) => {
        if (prev < 4) return prev + 1;
        clearInterval(pinInterval);
        return prev;
      });
    }, 300);

    return () => {
      clearInterval(regInterval);
      clearInterval(pinInterval);
    };
  }, []);

  const slideVariant = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
    transition: { duration: 0.85, ease: [0.7, 0, 0.24, 1] },
  };

  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed="0.6"
      className="relative w-full pt-1 overflow-hidden bg-[#f3f4f6]"
    >
      <style>{`
        @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-25%); }
        }
        .animate-marquee {
            animation: marquee 25s linear infinite;
        }
      `}</style>

      {/* ===== HEADER MARQUEE ===== */}
      <div className="w-full py-1 overflow-hidden mb-1 mt-20">
        <div className="relative flex overflow-x-hidden">
          <div className="py-2 animate-marquee whitespace-nowrap flex items-center min-w-full">
            <span className="text-black text-xs md:text-sm font-bold uppercase tracking-widest mx-4 md:mx-8">
              Our Application Launching soon!🎉 <span className="text-green-500 font-bold">We are live in Hyderabad & Delhi!</span>
            </span>
          </div>
        </div>
      </div>

      {/* ===== HEADLINE AREA ===== */}
      <div className="px-4 sm:px-8 md:px-20">
        <h1 className="flex flex-col gap-[0.1rem] sm:gap-[0.2rem] md:gap-[0.3rem]">
          {/* --- FIRST LINE --- */}
          <div className="flex items-end gap-3 leading-none">
            <span className="text-[10vw] sm:text-[7vw] md:text-[6.5vw] uppercase font-bold text-zinc-800">
              Any
            </span>
            <div className="overflow-hidden h-[10vw] sm:h-[7vw] md:h-[6.5vw]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeSet + "-any"}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={slideVariant}
                  className="block text-[10vw] sm:text-[7vw] md:text-[6.5vw] uppercase font-bold text-green-500 leading-none"
                >
                  {alternates[activeSet][0]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* --- SECOND LINE --- */}
          <div className="flex items-end gap-3 leading-none">
            <span className="text-[10vw] sm:text-[7vw] md:text-[6.5vw] font-bold text-zinc-800">
              REAL{" "}
              <span className="text-green-500 font-bold">FAST</span>
            </span>
          </div>

          {/* --- THIRD LINE --- */}
          <div className="flex items-end gap-3 leading-none ">
            <span className="text-[13vw] sm:text-[9vw] md:text-[7vw] font-bold text-zinc-800">
              We’re{" "}
              <span className="text-zinc-800 font-bold">On</span>
              <span className="text-green-500 font-bold leading-none">IT</span>
            </span>
          </div>
        </h1>
        <div className="mt-5 w-[90%] md:hidden">
          <p className="text-base text-zinc-600 leading-tight font-medium text-justify">
            Connecting people who need help with those ready to help <span className="text-green-500 font-bold">instantly,</span> <span className="text-green-500 font-bold">locally,</span> and with  <span className="text-green-500 font-bold">direct and fair connections.</span>
          </p>
        </div>

        {/* Desktop Description */}
        <div className="hidden md:block">
          <p className="mt-3 sm:mt-5 ml-2 -mb-5 text-[4.5vw] sm:text-[4vw] md:text-xl text-zinc-600 w-[90%] md:w-[60%] leading-relaxed">
            Connecting people who need help with those ready to help
          </p>
          <p className="mt-3 sm:mt-5 ml-2 -mb-7 text-[4.5vw] sm:text-[4vw] md:text-xl text-zinc-600 w-[90%] md:w-[60%] leading-relaxed">
            <span className="text-green-500 font-semibold leading-none">instantly,</span> <span className="text-green-500 font-semibold leading-none">locally,</span> and with <span className="text-green-500 font-semibold leading-none">direct and fair connections.</span>
          </p>
        </div>
      </div>
      {/* ===== RIGHT SIDE LOTTIE (Desktop) ===== */}
      <div className="absolute hidden md:flex justify-center items-center right-36 top-1/2 transform -translate-y-1/2">
        <iframe
          src="https://lottie.host/embed/b3802199-d96b-4dff-becc-82708e459d9a/UxlUIQgqqD.lottie"
          style={{ width: "420px", height: "420px", border: "none" }}
          title="Connecting People Animation"
        ></iframe>
      </div>

      {/* ===== MOBILE LOTTIE ===== */}
      <div className="flex md:hidden justify-center mt-8">
        <iframe
          src="https://lottie.host/embed/b3802199-d96b-4dff-becc-82708e459d9a/UxlUIQgqqD.lottie"
          style={{ width: "220px", height: "220px", border: "none" }}
          title="Connecting People Animation Mobile"
        ></iframe>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-zinc-400 mt-5 md:mt-20 flex flex-col md:flex-row justify-between items-center py-6 px-4 sm:px-8 md:px-20 bg-[#f3f4f6] text-center md:text-left">
        {/* --- COUNTERS --- */}
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
          {/* Registered Users */}
          <div className="flex items-end gap-2">
            <span className="text-green-600 text-4xl sm:text-5xl md:text-6xl font-bold leading-none">
              {registerCount}+
            </span>
            <span className="text-zinc-700 text-sm sm:text-base md:text-lg font-semibold">
              Registered
            </span>
          </div>

          {/* Divider Line */}
          <div className="hidden sm:block w-[2px] h-8 bg-zinc-300 rounded-full"></div>

          {/* Pin Codes */}
          <div className="flex items-end gap-2">
            <span className="text-green-600 text-4xl sm:text-5xl md:text-6xl font-bold leading-none">
              {pinCount}+
            </span>
            <span className="text-zinc-700 text-sm sm:text-base md:text-lg font-semibold">
              Pin Codes
            </span>
          </div>
        </div>

        {/* --- BUTTONS --- */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 sm:gap-4 mt-6 md:mt-0 w-full md:w-auto">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeD90sDCZFts-uu_g_FgfVfG4Qmb1Ixyf0rJI7f-I4y9L6hgA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-zinc-700 rounded-full px-6 py-2.5 sm:px-5 sm:py-2 text-sm sm:text-sm md:text-base 
               font-medium bg-zinc-900 text-white flex items-center gap-2 transition-all duration-300 
               hover:bg-green-500 hover:text-white hover:border-green-500 shadow-md md:shadow-none"
          >
            Post a Task
          </a>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdjLQSxhukM9y99iIDBT8p86_ZLZi3gYuxseIC1kK0FbL31ag/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-zinc-700 rounded-full px-6 py-2.5 sm:px-5 sm:py-2 text-sm sm:text-sm md:text-base 
               font-medium bg-zinc-900 text-white flex items-center gap-2 transition-all duration-300 
               hover:bg-green-500 hover:text-white hover:border-green-500 shadow-md md:shadow-none"
          >
            Start Earning
          </a>

          <div className="hidden md:flex w-10 h-10 sm:w-9 sm:h-9 rounded-full justify-center items-center bg-green-500 text-white transition-all duration-300 hover:bg-zinc-900 hover:text-white shadow-lg md:shadow-none">
            <FaArrowUpLong className="rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
