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
  X,
} from "react-feather";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState("");

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

  const handlePostTask = (details) => {
    setTaskDetails(details);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main style={{ paddingTop: NAV_HEIGHT }} className="relative">
        <HeroGlow />

        <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <HeroHeader heroWordIndex={heroWordIndex} />

          <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="mt-14">
            <SearchCard templateIndex={templateIndex} onPostTask={handlePostTask} />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-8">
          <CategoryChips />
        </section>
      </main>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} taskDetails={taskDetails} />
    </div>
  );
}

/* ----------------------------- MODAL ----------------------------- */

function Modal({ isOpen, onClose, taskDetails }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`/api/submit-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskDetails: taskDetails || "",
          mobileNumber: mobileNumber,
        }),
      });

      const text = await response.text();
      
      if (response.ok) {
        setMessage("Task submitted successfully! Our team will connect with you within 2 min.");
        setTimeout(() => {
          onClose();
          setMobileNumber("");
          setMessage("");
        }, 2000);
      } else {
        setMessage(text || "Failed to submit task. Please try again.");
      }
    } catch (err) {
      console.error("Submit task error:", err);
      setMessage("Failed to submit task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <MessageSquare size={32} className="text-emerald-600" />
          </div>
          
          <h3 className="mb-2 text-xl font-bold text-slate-900">
            Get Connected Quickly
          </h3>
          
          <p className="mb-6 text-slate-600">
            Just enter your mobile number, our team will connect with you within 2 min.
          </p>

          {message && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none"
            />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/* ----------------------------- NAVBAR ----------------------------- */

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100/50">
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

  const getDelay = (index) => {
    return updates[index].id === 3 ? 30000 : 20000;
  };

  useEffect(() => {
    const rotateUpdate = () => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % updates.length;
        const delay = getDelay(nextIndex);
        timerRef.current = setTimeout(rotateUpdate, delay);
        return nextIndex;
      });
    };

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
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="hidden md:block">
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
      </div>
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
    <div className="text-center px-2 sm:px-0">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900">
        Get Any<span className="text-emerald-600 inline-flex items-center justify-center w-[70px] sm:w-[90px] md:w-[110px] lg:w-[140px] h-[1.2em] overflow-hidden ml-1 sm:ml-2"><AnimatePresence mode="wait"><motion.span key={heroWordIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="absolute">{heroChangeWords[heroWordIndex]}</motion.span></AnimatePresence><span className="invisible">{heroChangeWords[heroWordIndex]}</span></span><span className="mx-1">Done Today</span>
      </h1>
      <p className="mx-auto mt-4 sm:mt-5 max-w-xl px-4 sm:px-0 text-sm sm:text-base md:text-lg text-slate-600">
        Connect with trusted professionals and get everyday work done faster.
      </p>
    </div>
  );
}

function TabSwitcher({ activeTab, setActiveTab }) {
  return (
    <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-1.5 sm:gap-2 px-2 sm:px-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition ${
              active
                ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm"
            }`}
          >
            <Icon size={12} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function SearchCard({ templateIndex, onPostTask }) {
  const [inputValue, setInputValue] = useState(taskTemplates[templateIndex] || "");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Only update with template when not focused and input is empty
    if (!isFocused && !inputValue) {
      setInputValue(taskTemplates[templateIndex]);
    }
  }, [templateIndex, isFocused, inputValue]);

  const handleFocus = () => {
    setIsFocused(true);
    setInputValue(""); // Clear template when user clicks to type
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Optionally restore template if input is empty when blurred
    if (!inputValue) {
      setInputValue(taskTemplates[templateIndex]);
    }
  };

  const handlePostClick = () => {
    onPostTask(inputValue);
  };

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500" />
      <div className="p-4 sm:p-6 md:p-7">
        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">What do you need help with?</h3>
          <span className="text-xs sm:text-sm text-slate-400">Try these →</span>
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <label className="flex flex-1 items-start gap-2 sm:gap-3 rounded-xl border-2 border-slate-200 bg-slate-50 px-3 sm:px-4 py-3 sm:py-4 transition focus-within:border-emerald-500 focus-within:bg-white">
            <Search size={20} className="text-emerald-600 flex-shrink-0 mt-1" />
            <input
              aria-label="Describe your task"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Describe your task..."
              className="w-full bg-transparent text-sm sm:text-base text-slate-700 placeholder:text-slate-400 focus:outline-none pt-1"
            />
          </label>

          <button onClick={handlePostClick} className="h-auto sm:h-[74px] rounded-xl bg-emerald-600 px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-semibold text-white transition hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30 sm:min-w-[160px] inline-flex items-center justify-center gap-2 whitespace-nowrap">
            Post Task <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-600" />Instant Matching</span>
          <span className="inline-flex items-center gap-1.5"><Shield size={14} className="text-emerald-600" />Verified Experts</span>
          <span className="inline-flex items-center gap-1.5"><MessageSquare size={14} className="text-emerald-600" />24/7 Support</span>
        </div>
      </div>
    </div>
  );
}

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
