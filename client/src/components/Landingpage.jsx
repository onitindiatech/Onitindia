<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  CheckCircle,
  Shield,
  MessageSquare,
  Cpu,
  FileText,
  List,
  HelpCircle,
  UserPlus,
  UserCheck,
  FilePlus,
  Clock,
} from "react-feather";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";

/**
 * Top SaaS-style Landing Page (single-file React component)
 * - Professional layout hierarchy
 * - Sticky navbar with aligned container
 * - Wider desktop container
 * - Clean hero spacing (no clipping under navbar)
 * - Reusable, structured sections
 */

/* ----------------------------- CONFIG ----------------------------- */

const NAV_HEIGHT = 80;

const tabs = [
  { id: "ai", label: "AI Mode", icon: Cpu, description: "AI-powered task matching" },
  { id: "post", label: "Post a Task", icon: FileText, description: "Tell us what you need" },
  { id: "types", label: "Task Types", icon: List, description: "Browse categories" },
  { id: "how", label: "How It Works", icon: HelpCircle, description: "Learn the process" },
];

const taskTemplates = [
  "Research 10 competitors in my niche",
  "Design a professional logo for my brand",
  "Write a 500-word blog post about AI",
  "Create a financial spreadsheet with formulas",
  "Edit my wedding video highlights",
  "Find leads for B2B companies",
  "Build a responsive landing page",
  "Translate 20 pages to Spanish",
];

const heroChangeWords = ["Task", "Help", "Work"];

const categories = ["Design", "Excel Work", "Research", "Presentation", "Lead Generation"];

/* ----------------------------- PAGE ----------------------------- */

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("post");
  const [templateIndex, setTemplateIndex] = useState(0);
  const [heroWordIndex, setHeroWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTemplateIndex((prev) => (prev + 1) % taskTemplates.length);
    }, 3000);

    const heroTimer = setInterval(() => {
      setHeroWordIndex((prev) => (prev + 1) % heroChangeWords.length);
    }, 2500);

    return () => {
      clearInterval(timer);
      clearInterval(heroTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main style={{ paddingTop: NAV_HEIGHT }}>
        <HeroGlow />

        <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <HeroHeader heroWordIndex={heroWordIndex} />

          <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="mt-14">
            <SearchCard templateIndex={templateIndex} />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-8">
          <CategoryChips />
        </section>
      </main>
    </div>
  );
}

/* ----------------------------- NAVBAR ----------------------------- */

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100/50">
      {/* Subtle emerald glow at the bottom of header */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
      
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="text-xl font-extrabold tracking-tight text-slate-900">
          On<span className="text-emerald-600">IT</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a className="relative group hover:text-emerald-600 transition-colors" href="#">
            Domain
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
          </a>
          <a className="relative group hover:text-emerald-600 transition-colors" href="#">
            About Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
          </a>
          <a className="relative group hover:text-emerald-600 transition-colors" href="#">
            OnIT Campus
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
          </a>
          <a className="relative group hover:text-emerald-600 transition-colors" href="#">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
          </a>
          <a className="relative group hover:text-emerald-600 transition-colors" href="#">
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
          </a>
        </nav>

        <button className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-600 hover:to-emerald-700 hover:shadow-emerald-500/40 hover:-translate-y-0.5">
          Start Posting <ArrowRight size={16} />
        </button>
      </div>
    </header>
  );
}

/* ----------------------------- HERO ----------------------------- */

function HeroGlow() {
  const updates = [
    {
      id: 1,
      user: "Preeti",
      action: "accepted the task",
      icon: UserCheck,
      color: "bg-emerald-100 text-emerald-600",
      positionClass: "left-6 sm:left-10 top-32 sm:top-40",
    },
    {
      id: 2,
      user: "Rahul",
      action: "joined as a performer",
      icon: UserPlus,
      color: "bg-blue-100 text-blue-600",
      positionClass: "right-4 sm:right-10 top-40 sm:top-52",
    },
    {
      id: 3,
      user: "Nikhil",
      action: "posted a new task",
      icon: FilePlus,
      color: "bg-purple-100 text-purple-600",
      positionClass: "left-4 sm:left-10 top-40 sm:top-52",
    },
    {
      id: 4,
      user: "Amit",
      action: "completed 5 tasks",
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
      positionClass: "right-4 sm:right-10 top-32 sm:top-40",
    },
    {
      id: 5,
      user: "Sneha",
      action: "joined as performer",
      icon: UserPlus,
      color: "bg-pink-100 text-pink-600",
      positionClass: "left-4 sm:left-10 top-32 sm:top-40",
    },
    {
      id: 6,
      user: "Vikram",
      action: "accepted task",
      icon: UserCheck,
      color: "bg-orange-100 text-orange-600",
      positionClass: "right-4 sm:right-10 top-40 sm:top-52",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = React.useRef(null);

  // Function to get delay based on current update
  const getDelay = (index) => {
    // Nikhil's update (id: 3) should have 20 second delay, others have 10 seconds
    return updates[index].id === 3 ? 20000 : 10000;
  };

  useEffect(() => {
    const rotateUpdate = () => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % updates.length;
        // Schedule next rotation with appropriate delay
        const delay = getDelay(nextIndex);
        timerRef.current = setTimeout(rotateUpdate, delay);
        return nextIndex;
      });
    };

    // Initial timeout
    timerRef.current = setTimeout(rotateUpdate, getDelay(0));

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [updates.length]);

  const currentUpdate = updates[currentIndex];
  const Icon = currentUpdate.icon;

  return (
    <>
      {/* Main glow */}
      <div className="pointer-events-none absolute inset-x-0 top-16 flex justify-center">
        <div className="h-[400px] w-full max-w-5xl rounded-full bg-gradient-to-b from-emerald-200/60 via-emerald-100/40 to-transparent blur-3xl" />
      </div>
      {/* Secondary accent glow */}
      <div className="pointer-events-none absolute -left-32 top-32 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-48 h-64 w-64 rounded-full bg-teal-300/20 blur-3xl" />
      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Professional Updates - Rotating */}
      <motion.div
        key={currentUpdate.id}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className={`pointer-events-none absolute ${currentUpdate.positionClass}`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/60 backdrop-blur-sm px-3 py-1.5 shadow-sm">
          <span className={`inline-flex items-center justify-center rounded-full p-1 ${currentUpdate.color}`}>
            <Icon size={10} />
          </span>
          <span className="text-xs sm:text-sm text-slate-600">
            <span className="font-semibold text-slate-800">{currentUpdate.user}</span> {currentUpdate.action}
          </span>
        </div>
      </motion.div>
    </>
  );
}

function HeroBadge() {
  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
      </span>
      Trusted by 50,000+ businesses worldwide
    </div>
  );
}

function HeroHeader({ heroWordIndex }) {
  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-slate-900">
        Get Any<span className="text-emerald-600 inline-flex items-center justify-center w-[110px] sm:w-[140px] md:w-[170px] h-[1.2em] overflow-hidden"><AnimatePresence mode="wait"><motion.span key={heroWordIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="absolute">{heroChangeWords[heroWordIndex]}</motion.span></AnimatePresence><span className="invisible">{heroChangeWords[heroWordIndex]}</span></span>Done Today
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-slate-600">
        Connect with trusted professionals and get everyday work done faster.
      </p>
    </div>
  );
}

function TabSwitcher({ activeTab, setActiveTab }) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
              active
                ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm"
            }`}
          >
            <Icon size={14} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function SearchCard({ templateIndex }) {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500" />
      <div className="p-5 sm:p-6 md:p-7">
        {/* Card Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">What do you need help with?</h3>
          <span className="text-sm text-slate-400">Try these →</span>
        </div>
        
        {/* Animated template */}
        <div className="mb-4 h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={templateIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-base sm:text-lg font-medium text-slate-500"
            >
              {taskTemplates[templateIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex flex-1 items-center gap-3 rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-emerald-500 focus-within:bg-white">
            <Search size={18} className="text-emerald-600" />
            <input
              aria-label="Describe your task"
              type="text"
              placeholder="Describe your task..."
              className="w-full bg-transparent text-sm sm:text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </label>

          <button className="h-12 sm:h-14 rounded-xl bg-emerald-600 px-6 text-sm sm:text-base font-semibold text-white transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30 sm:min-w-[150px] inline-flex items-center justify-center gap-2">
            Post Task <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Trust indicators with enhanced styling */}
      <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-600" />Instant Matching</span>
          <span className="inline-flex items-center gap-1.5"><Shield size={14} className="text-emerald-600" />Verified Experts</span>
          <span className="inline-flex items-center gap-1.5"><MessageSquare size={14} className="text-emerald-600" />24/7 Support</span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- LOWER SECTIONS ----------------------------- */

function CategoryChips() {
  return (
    <section className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      <span className="mr-1 text-sm text-slate-400">Popular:</span>
      {categories.map((cat) => (
        <button
          key={cat}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
        >
          {cat}
        </button>
      ))}
    </section>
  );
}

function Stats() {
  const stats = [
    { number: "50K+", label: "Tasks Done" },
    { number: "10K+", label: "Experts" },
    { number: "4.9★", label: "Rating" },
  ];

  return (
    <section className="mt-8 border-t border-slate-200 pt-8 pb-4">
      <div className="flex flex-wrap justify-center gap-10 sm:gap-16 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">{s.number}</div>
            <div className="mt-1 text-xs sm:text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
=======
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
>>>>>>> f34be6035be733b0f605ba286734b0031df7d313
