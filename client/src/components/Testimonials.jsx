import React, { useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import img1 from "../assets/WhatsApp Image 2025-10-30 at 20.06.13_feaacb46.jpg";
import img2 from "../assets/WhatsApp Image 2025-10-30 at 20.06.27_20b3e035.jpg";
import img3 from "../assets/WhatsApp Image 2025-10-30 at 20.08.00_be6fa9e6.jpg";
import img4 from "../assets/WhatsApp Image 2025-10-30 at 20.09.25_4389ea86.jpg";
import img5 from "../assets/WhatsApp Image 2025-10-30 at 20.09.44_b48879c0.jpg";
import img6 from "../assets/WhatsApp Image 2025-10-30 at 20.11.27_5ac1d41d.jpg";
import img7 from "../assets/avi.jpg";


function Testimonials() {
  const testimonials = [
    {
      name: "Sneha Patel",
      profession: "Entrepreneur",
      text: "Found reliable helpers for my startup in just a few hours!",
      img: img6,
    },
    {
      name: "Avinash",
      profession: "Student",
      text: "My group project was saved when I got design help overnight. Smooth process!",
      img: img7,
    },
    {
      name: "Abhi Reddy",
      profession: "Private job",
      text: "Booked a plumber instantly — no calls, no waiting. Just OnIT!",
      img: img2,
    },
    {
      name: "Kiran Das",
      profession: "Cafe Owner",
      text: "Found someone to fix my espresso machine within an hour. Amazing service!",
      img: img4,
    },
    {
      name: "Bunny",
      profession: "Freelancer",
      text: "Used OnIT to hire quick help for a shoot — worked perfectly.",
      img: img5,
    },
    {
      name: "Vikram Mehta",
      profession: "Event Planner",
      text: "Needed last-minute hands for setup. OnIT connected me fast and saved my day!",
      img: img1,
    },
  ];


  const baseX = useRef(0);
  const containerRef = useRef(null);
  const isHovered = useRef(false);

  useAnimationFrame((t, delta) => {
    if (!isHovered.current) {
      const speed = 40;
      baseX.current -= (speed * delta) / 1000;
      if (baseX.current <= -window.innerWidth) baseX.current = 0;
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${baseX.current}px)`;
      }
    }
  });

  return (
    <section className="relative w-full py-10 md:min-h-screen flex flex-col justify-center items-center bg-[#f3f4f6] overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-4 md:mb-10 px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-800 font-['Neue Montreal']">
          Real Stories from On<span className="text-green-600">IT</span>
        </h1>
        <p className="text-slate-600 mt-3 sm:mt-4 text-base sm:text-lg">
          Hear what our users have to say about their experience.
        </p>
      </div>

      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 w-20 sm:w-40 h-full bg-gradient-to-r from-[#F7FBF8] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-20 sm:w-40 h-full bg-gradient-to-l from-[#F7FBF8] to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling Testimonials */}
      <div
        className="relative w-full overflow-hidden py-4 sm:py-10"
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => (isHovered.current = false)}
      >
        <div ref={containerRef} className="flex gap-3 sm:gap-6 px-4 sm:px-10 items-stretch">
          {[...testimonials, ...testimonials].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -8 }}
              transition={{ duration: 0.4 }}
              className="min-w-[180px] sm:min-w-[300px] max-w-[200px] sm:max-w-[370px] h-[160px] sm:h-[250px] bg-white border border-green-100
              rounded-xl sm:rounded-3xl p-3 sm:p-8 flex flex-col justify-between 
               overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:border-green-600"
            >

              {/* Card content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center gap-2 sm:gap-4 mb-1 sm:mb-2">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-8 h-8 sm:w-14 sm:h-14 rounded-full border-2 justify-center border-green-700 object-cover"
                  />
                  <div>
                    <h3 className="text-green-700 text-sm sm:text-xl font-semibold font-['Neue Montreal']">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-[10px] sm:text-base font-medium">{item.profession}</p>
                  </div>
                </div>

                <p className="text-gray-700 text-[10px] sm:text-[1rem] leading-relaxed italic mt-1 sm:mt-2 flex-grow line-clamp-4 sm:line-clamp-none">
                  “{item.text}”
                </p>

                {/* Bottom line accent */}

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtext */}
      <div className="text-center mt-5 px-4">
        <p className="text-gray-700 italic text-base sm:text-lg">
          “Real people. Real impact. One platform -{" "}
          <span className="text-black font-semibold">
            On<span className="text-green-500 font-semibold">IT</span>
          </span>
          .”
        </p>
      </div>
    </section>
  );
}

export default Testimonials;
