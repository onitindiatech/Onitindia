import React from "react";
import { motion } from "framer-motion";
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";
import t3 from "../assets/t3.png";
import t4 from "../assets/t4.png";
import t5 from "../assets/t5.png";
import t6 from "../assets/t6.png";




const knowAboutUsCards = [
  {
<<<<<<< HEAD
    seekerQ: "I need someone to fix my leaking tap quickly.",
    performerA: "I’m a local plumber who can help you right away.",
=======
    seekerQ: "Build a list of 200 companies with contact details in Excel.",
    performerA: "I can research and compile this accurately.",
>>>>>>> f34be6035be733b0f605ba286734b0031df7d313
    seekerAvatar: t3,
    performerAvatar: t1, // plumber avatar
  },
  {
<<<<<<< HEAD
    seekerQ: "I’m shifting apartments and need help with packing.",
    performerA: "I can assist with packing and moving your stuff safely.",
=======
    seekerQ: "Edit this video and add captions for social media",
    performerA: "I can edit the video and add clear captions",
>>>>>>> f34be6035be733b0f605ba286734b0031df7d313
    seekerAvatar: t4,
    performerAvatar: t2, // mover avatar
  },
  {
<<<<<<< HEAD
    seekerQ: "Can someone help me set up my new smart TV?",
    performerA: "I’ve experience with installing smart devices - I can help!",
=======
    seekerQ: "Create a PPT from these notes i have shared",
    performerA: "I can make a clear and professional presentation.",
>>>>>>> f34be6035be733b0f605ba286734b0031df7d313
    seekerAvatar: t6,
    performerAvatar: t5, // tech installer
  },
  {
<<<<<<< HEAD
    seekerQ: "I’m busy with work, and my plants need daily watering.",
    performerA: "I live nearby and can take care of your plants every day.",
=======
    seekerQ: "Create a 1-page landing page using this template and content.",
    performerA: "can set up using your template and content in an hour",
>>>>>>> f34be6035be733b0f605ba286734b0031df7d313
    seekerAvatar: t5,
    performerAvatar: t2, // gardener
  },
  {
<<<<<<< HEAD
    seekerQ: "I need a tutor to help my kid with math homework.",
    performerA: "I’m a student teacher and can teach math after school hours.",
=======
    seekerQ: "I need someone to reply to customer emails",
    performerA: "I can manage and respond to emails professionally",
>>>>>>> f34be6035be733b0f605ba286734b0031df7d313
    seekerAvatar: t6,
    performerAvatar: t4, // teacher
  },
  {
<<<<<<< HEAD
    seekerQ: "I have guests coming - can anyone clean my house today?",
    performerA: "I offer same-day house cleaning services in your area.",
=======
    seekerQ: "Visit this store and take product shelf photos.",
    performerA: "I can visit and share the photos you need.",
>>>>>>> f34be6035be733b0f605ba286734b0031df7d313
    seekerAvatar: t1,
    performerAvatar: t6, // cleaner
  },
];

const KnowUserSection = () => {
  return (
    <div className="w-full h-screen bg-[#f3f4f6] flex flex-col justify-center items-center px-4">
      {/* Cards container */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-3 
          gap-6 
          w-full 
          max-w-6xl 
          px-4 
          overflow-y-auto
          lg:overflow-hidden
        "
      >
        {knowAboutUsCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-gradient-to-br from-zinc-50 to-green-50 border-2 border-green-200 rounded-2xl p-6 flex flex-col gap-4 items-center shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Task Seeker */}
            <div className="flex items-start w-full">
              <img
                src={card.seekerAvatar}
                alt="Task Seeker"
                className="w-10 h-10 rounded-full mr-3 border-2 border-[#004d43]"
              />
              <div className="bg-white/80 border border-zinc-200 text-black rounded-2xl rounded-tl-none px-4 py-3 w-full shadow-sm">
                <p className="font-bold text-xs mb-1 text-[#004d43] uppercase tracking-wide">Task Seeker</p>
                <p className="text-sm text-zinc-800 leading-relaxed">{card.seekerQ}</p>
              </div>
            </div>

            {/* Task Performer */}
            <div className="flex items-start w-full justify-end">
              <div className="bg-[#004d43] text-white rounded-2xl rounded-tr-none px-4 py-3 w-full shadow-sm">
                <p className="font-bold text-xs mb-1 text-green-300 uppercase tracking-wide">Task Performer</p>
                <p className="text-sm leading-relaxed">{card.performerA}</p>
              </div>
              <img
                src={card.performerAvatar}
                alt="Task Performer"
                className="w-10 h-10 rounded-full ml-3 border-2 border-green-500"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Flaticon Credit */}

    </div>
  );
};

export default KnowUserSection;
