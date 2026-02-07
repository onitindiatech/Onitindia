import React from "react";
import { motion } from "framer-motion";
import { Send, Search, MessageCircle, CheckCircle } from "react-feather";

const cards = [
  {
    number: "1",
    title: "Post",
    description: "Quickly post your task or request in just a few taps.",
    icon: <Send className="text-[#1a1a1a] w-5 h-5 sm:w-10 sm:h-10" />,
  },
  {
    number: "2",
    title: "Find",
    description: "Nearby helpers instantly see and accept your request.",
    icon: <Search className="text-[#1a1a1a] w-5 h-5 sm:w-10 sm:h-10" />,
  },
  {
    number: "3",
    title: "Connect",
    description: "Chat, track progress, and stay updated in real time.",
    icon: <MessageCircle className="text-[#1a1a1a] w-5 h-5 sm:w-10 sm:h-10" />,
  },
  {
    number: "4",
    title: "Complete",
    description: "Task done on time with secure payment and feedback.",
    icon: <CheckCircle className="text-[#1a1a1a] w-5 h-5 sm:w-10 sm:h-10" />,
  },
];

function Task_see() {
  return (
    <div className="w-full py-8 md:min-h-screen px-4 sm:px-18 md:px-18 flex flex-col items-center md:justify-center">
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-9">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-800 font-['Neue Montreal']">
          Find Tasker Nearby You!
        </h1>
        <p className="text-gray-600 mt-6 sm:mt-4 text-base sm:text-lg">
          Get Anything Done. Just Ask.
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 w-full max-w-7xl">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-md 
                       border-2 border-green-200
                       bg-gradient-to-br from-white via-white to-[#dcfce7]
                       flex flex-col justify-between
                       w-[48%] sm:w-[45%] md:w-[45%] lg:w-[22%]
                       h-[180px] sm:h-[270px] md:h-[320px]"
          >
            {/* Background Number */}
            <span className="absolute text-[5rem] sm:text-[6rem] md:text-[8rem] font-bold text-green-200 top-auto bottom-[-1rem] left-[1rem] right-auto sm:top-35 sm:left-6 md:left-8 select-none">
              {card.number}
            </span>
            {/* Card Content */}
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-3 text-black font-['Neue Montreal']">
                  {card.title}
                </h2>
                <motion.div transition={{ type: "spring", stiffness: 200 }} className="-mt-1">
                  {card.icon}
                </motion.div>
              </div>
              <p className="text-gray-700 mt-1 sm:mt-3 text-[10px] sm:text-sm sm:text-base leading-relaxed">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Task_see;
