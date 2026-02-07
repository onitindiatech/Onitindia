import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserPlus, Search, Briefcase, DollarSign, ArrowLeft } from "react-feather";
import Footer from "./Footer";
import SEO from "./SEO";
import { IndianRupee } from "lucide-react";


const cards = [
  {
    number: "1",
    title: "Register",
    description: "Create your profile and start your journey in minutes.",
    icon: <UserPlus className="text-[#1a1a1a]" />,
  },
  {
    number: "2",
    title: "Choose Domain",
    description: "Select your area of expertise and interests.",
    icon: <Briefcase className="text-[#1a1a1a]" />,
  },
  {
    number: "3",
    title: "Find Work",
    description: "Discover nearby opportunities that fit your skills.",
    icon: <Search className="text-[#1a1a1a]" />,
  },
  {
    number: "4",
    title: "Get Paid",
    description: "Complete tasks and earn securely with instant payout.",
    icon: <IndianRupee className="text-[#1a1a1a]" />,
  },
];



// ... existing code ...

function Task_Performers() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#f3f4f6]">
      <SEO
        title="Find Work Nearby | Task Performers"
        description="Find local work opportunities nearby. Work when you want and earn what you deserve with OnIT India."
        keywords="local work, task performer, earn money, gig jobs, part time jobs, OnIT India"
        canonical="https://onitindia.com/task-performers"
      />
      {/* Main Content */}
      <div className="flex-grow px-4 sm:px-8 md:px-20 py-14 sm:py-20 relative">
        {/* 🔙 Back Button */}


        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14 mt-24 sm:mt-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black font-['Neue Montreal'] leading-snug">
            Join as Task Performer
          </h1>
          <p className="text-gray-600 mt-3 sm:mt-4 text-base sm:text-lg">
            Work When You Want. Earn What You Deserve.
          </p>
        </div>

        {/* Cards Section */}
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl p-5 sm:p-6 md:p-8 shadow-md 
                         bg-gradient-to-br from-[#e3eafc] to-[#D9EEE3]
                         flex flex-col justify-between
                         w-[45%] sm:w-[45%] md:w-[22%]
                         h-[230px] sm:h-[270px] md:h-[320px]"
            >
              {/* Background Number */}
              <span className="absolute font-bold text-black/15 select-none 
                               text-[6rem] -bottom-6 right-2 
                               md:text-[8rem] md:top-24 md:left-6 md:right-auto md:bottom-auto">
                {card.number}
              </span>

              {/* Card Content */}
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-black font-['Neue Montreal']">
                    {card.title}
                  </h2>
                  <motion.div transition={{ type: 'spring', stiffness: 200 }}>
                    {card.icon}
                  </motion.div>
                </div>
                <p className="text-gray-700 mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ Register Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mt-16 sm:mt-20 md:mt-24">

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdjLQSxhukM9y99iIDBT8p86_ZLZi3gYuxseIC1kK0FbL31ag/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white text-base sm:text-1xl px-8 sm:px-10 py-5
               rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-md"
          >
            Register
          </a>


        </div>

      </div>


      <Footer />
    </div>
  );
}

export default Task_Performers;
