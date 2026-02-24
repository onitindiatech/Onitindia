import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight } from "react-feather";
import homeHelpVideo from "../assets/3.mp4";
import tutoringVideo from "../assets/1.mp4";
import food from "../assets/2.mp4"
import tutoringGif from "../assets/4.gif";

const domains = [
  {
    title: "Home Help",
    description: "Get expert help for home chores, cleaning, and organizing tasks.",
    video: homeHelpVideo,
  },
  {
    title: "Car & Driver",
    description: "Find trusted drivers or get your car serviced without hassle.",
    animation: "https://lottie.host/embed/54336a68-cddc-412f-99da-89c110433d84/kGnwtsznZI.lottie",
  },
  {
    title: "Food & Grocery",
    description: "Order groceries, food delivery, or get quick local errands done.",
    video: food,
  },
  {
    title: "Project",
    description: "Get your projects done — from ideas to execution.",
    video: tutoringVideo,
  },
  {
    title: "Tutoring",
    description: "Find local tutors for any subject or skill you want to learn.",
    img: tutoringGif,
  },
];


function Domains() {
  return (
    <div className="w-full px-4 mt-0 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-16 bg-[#f3f4f6]">
      {/* Heading */}
      <div className="text-center mb-6 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-800 font-['Neue Montreal'] mb-2">
          Explore Domains on <span className="text-black">On<span className="text-green-600">IT</span></span>
        </h1>
        <p className="text-zinc-800 mt-3 text-base sm:text-lg">
          Discover your opportunities and start working smartly.
        </p>
      </div>

      {/* Cards Section */}
      <div className="relative group/domain-scroll">
        {/* Left Scroll Button (Mobile Only) */}
        <button
          onClick={() => {
            const container = document.getElementById('domains-container');
            if (container) container.scrollBy({ left: -240, behavior: 'smooth' });
          }}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-700 lg:hidden"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Scroll Button (Mobile Only) */}
        <button
          onClick={() => {
            const container = document.getElementById('domains-container');
            if (container) container.scrollBy({ left: 240, behavior: 'smooth' });
          }}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-700 lg:hidden"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          id="domains-container"
          className="
            flex lg:grid
            lg:grid-cols-5
            overflow-x-auto lg:overflow-visible
            gap-4 sm:gap-6 md:gap-8
            pb-8 lg:pb-0
            scrollbar-hide
            snap-x
          "
        >
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1, y: -2 }}
              transition={{ duration: 0.3 }}
              className="
                  relative rounded-2xl sm:rounded-3xl shadow-md
                  bg-gradient-to-br from-[#e3eafc] via-[#D9EEE3] to-[#D9EEE3]
                  flex flex-col justify-between
                  flex-shrink-0 lg:flex-shrink
                  min-w-[220px] w-[220px] sm:w-auto lg:w-full
                  h-[240px] sm:h-[280px] md:h-[320px] lg:h-[370px]
                  p-4 sm:p-5 md:p-6
                  hover:shadow-xl border border-green-300
                  snap-center
                "
            >
              {/* Subtle Background Accent */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-green-100 to-transparent rounded-3xl pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2 md:mb-4">
                    <h2 className="text-base sm:text-xl font-bold text-gray-900 font-['Neue Montreal'] leading-tight">
                      {domain.title}
                    </h2>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
                  </div>
                  <p className="text-gray-700 text-xs sm:text-base leading-relaxed mb-2 sm:mb-3 line-clamp-3 lg:line-clamp-none">
                    {domain.description}
                  </p>
                </div>

                {/* Animation or Image */}
                {domain.animation ? (
                  <div className="w-full h-32 sm:h-28 md:h-32 lg:h-36 rounded-xl sm:rounded-2xl overflow-hidden mt-auto">
                    <iframe
                      src={domain.animation}
                      className="w-full h-full border-0 scale-110"
                      title={domain.title}
                    ></iframe>
                  </div>
                ) : domain.video ? (
                  <div className="w-full h-32 sm:h-28 md:h-32 lg:h-36 rounded-xl sm:rounded-2xl overflow-hidden mt-auto">
                    <video
                      src={domain.video}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                ) : (
                  <img
                    src={domain.img}
                    alt={domain.title}
                    className="w-full h-32 sm:h-28 md:h-32 lg:h-36 object-cover rounded-xl sm:rounded-2xl mt-auto"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Domains;
