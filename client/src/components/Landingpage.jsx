import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LightRays from "./LightRays";
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

const NAV_HEIGHT = 74;

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
    <div className="min-h-screen bg-transparent text-[var(--color-text)]">
      <Navbar />

      <main style={{ paddingTop: NAV_HEIGHT }} className="relative">
        <LightRays
          raysOrigin="top-center"
          raysColor="#059669"
          rayCount={9}
          rayLength="75vh"
          lightSpread={1.4}
          pulsating={true}
          raysSpeed={0.8}
          className="!z-[1]"
        />
        {/* Soft gradient orbs for depth */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <div className="absolute top-[-20%] left-1/2 w-[120%] max-w-[800px] h-[60vh] -translate-x-1/2 rounded-full bg-gradient-to-b from-[var(--color-primary)]/12 via-[var(--color-primary)]/4 to-transparent blur-3xl" />
          <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--color-primary)]/8 blur-3xl" />
          <div className="absolute top-[20%] left-[-15%] w-[350px] h-[350px] rounded-full bg-teal-400/10 blur-3xl" />
        </div>
        <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-1 sm:pt-2 pb-10">
          <HeroLivePills />
          <HeroHeader heroWordIndex={heroWordIndex} />
          <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="mt-12 sm:mt-14">
            <SearchCard templateIndex={templateIndex} onPostTask={handlePostTask} />
          </div>
        </section>

        <section id="domain" className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-8">
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
        className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-white p-6 sm:p-8 shadow-[var(--shadow-xl)]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-subtle)] hover:text-[var(--color-text)] transition"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-muted)]">
            <MessageSquare size={32} className="text-[var(--color-primary)]" />
          </div>
          
          <h3 className="mb-2 text-xl font-bold text-[var(--color-text)]">
            Get Connected Quickly
          </h3>
          
          <p className="mb-6 text-[var(--color-text-muted)]">
            Just enter your mobile number, our team will connect with you within 2 min.
          </p>

          {message && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${message.includes("success") ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)]" : "bg-red-100 text-red-700"}`}>
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
              className="w-full rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-primary)] focus:bg-white focus:outline-none"
            />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-primary-hover)] hover:shadow-[var(--shadow-glow)] disabled:opacity-50 disabled:cursor-not-allowed"
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]">
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent" />
      
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="text-xl font-extrabold tracking-tight text-[var(--color-text)]">
          On<span className="text-[var(--color-primary)]">IT</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-text-muted)]">
          <a className="relative group hover:text-[var(--color-primary)] transition-colors" href="#">
            Domain
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all group-hover:w-full" />
          </a>
          <a className="relative group hover:text-[var(--color-primary)] transition-colors" href="#">
            About Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all group-hover:w-full" />
          </a>
          <a className="relative group hover:text-[var(--color-primary)] transition-colors" href="#">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all group-hover:w-full" />
          </a>
          <a className="relative group hover:text-[var(--color-primary)] transition-colors" href="#">
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all group-hover:w-full" />
          </a>
        </nav>

        <button className="relative inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5">
          Start Posting <ArrowRight size={16} />
        </button>
      </div>
    </header>
  );
}

/* ----------------------------- HERO ----------------------------- */

const liveUpdates = [
  { user: "Preeti", action: "accepted the task", icon: UserCheck, color: "bg-emerald-100 text-emerald-600" },
  { user: "Rahul", action: "joined as performer", icon: UserPlus, color: "bg-blue-100 text-blue-600" },
  { user: "Nikhil", action: "posted a task", icon: FilePlus, color: "bg-purple-100 text-purple-600" },
  { user: "Amit", action: "completed 5 tasks", icon: UserCheck, color: "bg-green-100 text-green-600" },
  { user: "Sneha", action: "joined as performer", icon: UserPlus, color: "bg-pink-100 text-pink-600" },
];

const LIVE_CYCLE_MS = 4000;

function HeroLivePills() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % liveUpdates.length);
      setProgress(0);
    }, LIVE_CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      const value = Math.min((elapsed / LIVE_CYCLE_MS) * 100, 100);
      setProgress(value);
      if (value < 100) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [index]);

  const u = liveUpdates[index];
  const Icon = u.icon;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
      {/* LIVE badge – professional emerald accent */}
      <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-text)] px-2.5 py-1 shadow-[var(--shadow-sm)]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] animate-ping opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
        </span>
        <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-white/95">Live</span>
      </div>

      {/* Update pill with slide transition + progress bar */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-white/95 backdrop-blur-md shadow-[var(--shadow-sm)] ring-1 ring-black/5">
        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-emerald-400 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
        <div className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 sm:py-2">
          <motion.span
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`inline-flex items-center justify-center rounded-lg p-1 ${u.color}`}
          >
            <Icon size={12} className="sm:w-3 sm:h-3" />
          </motion.span>
          <div className="min-w-[100px] sm:min-w-[140px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="text-[11px] sm:text-xs"
              >
                <span className="font-semibold text-[var(--color-text)]">{u.user}</span>
                <span className="text-[var(--color-text-muted)]"> {u.action}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroHeader({ heroWordIndex }) {
  return (
    <div className="text-center px-2 sm:px-0">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-text)]"
      >
        Get any{" "}
        <span className="relative inline-flex items-center justify-center min-w-[80px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-[140px] h-[1.15em] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={heroWordIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bg-gradient-to-r from-[var(--color-primary)] via-emerald-500 to-teal-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(5,150,105,0.25)]"
            >
              {heroChangeWords[heroWordIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="invisible" aria-hidden>{heroChangeWords[heroWordIndex]}</span>
        </span>{" "}
        done. Today.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="mx-auto mt-4 sm:mt-6 max-w-xl px-4 sm:px-0 text-sm sm:text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed"
      >
        Connect with trusted professionals. Post a task, get it done—with milestone escrow and verified work.
      </motion.p>
    </div>
  );
}

function TabSwitcher({ activeTab, setActiveTab }) {
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // Scroll to domain section when "Task Types" tab is clicked
    if (tabId === "types") {
      const element = document.getElementById("domain");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    // Scroll to howitworks section when "How It Works" tab is clicked
    if (tabId === "how") {
      const element = document.getElementById("howitworks");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-1.5 sm:gap-2 px-2 sm:px-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition ${
              active
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[var(--shadow-glow)]"
                : "border-[var(--color-border)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-border)] hover:shadow-[var(--shadow-sm)]"
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -2 }}
      className="mt-10 sm:mt-12 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-lg)] ring-2 ring-transparent ring-offset-2 ring-offset-[var(--color-surface)] transition-all duration-300 focus-within:ring-[var(--color-primary)]/40 focus-within:shadow-[0_0_0_1px_rgba(5,150,105,0.08),0_20px_40px_-12px_rgba(0,0,0,0.08),0_0_48px_-12px_rgba(5,150,105,0.15)] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.1),0_0_60px_-16px_rgba(5,150,105,0.12)]"
    >
      {/* Animated gradient bar with shine overlay */}
      <div className="relative h-1.5 overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-400 to-cyan-500 animate-gradient-flow">
        <span
          className="absolute inset-0 z-10 block bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{ animation: "task-card-shine 6s ease-in-out infinite" }}
        />
      </div>
      <div className="p-4 sm:p-6 md:p-7">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <motion.h3 variants={itemVariants} className="text-base sm:text-lg font-semibold text-[var(--color-text)]">What do you need help with?</motion.h3>
            <motion.span variants={itemVariants} className="text-xs sm:text-sm text-[var(--color-text-subtle)]">Try these →</motion.span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <motion.label
              variants={itemVariants}
              className="flex flex-1 items-start gap-2 sm:gap-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-3 sm:px-4 py-3 sm:py-4 transition focus-within:border-[var(--color-primary)] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(5,150,105,0.08)]"
            >
              <Search size={20} className="text-[var(--color-primary)] flex-shrink-0 mt-1" />
              <input
                aria-label="Describe your task"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Describe your task..."
                className="w-full bg-transparent text-sm sm:text-base text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none pt-1"
              />
            </motion.label>

            <motion.button
              variants={itemVariants}
              onClick={handlePostClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-auto sm:h-[74px] rounded-xl bg-[var(--color-primary)] px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-semibold text-white shadow-[var(--shadow-sm)] transition hover:bg-[var(--color-primary-hover)] hover:shadow-[var(--shadow-glow)] sm:min-w-[160px] inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Post Task <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="border-t border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-4 sm:px-5 py-3 sm:py-4"
      >
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-[var(--color-text-muted)]">
          <span className="inline-flex items-center gap-1.5"><CheckCircle size={14} className="text-[var(--color-primary)]" />Instant Matching</span>
          <span className="inline-flex items-center gap-1.5"><Shield size={14} className="text-[var(--color-primary)]" />Verified Experts</span>
          <span className="inline-flex items-center gap-1.5"><MessageSquare size={14} className="text-[var(--color-primary)]" />24/7 Support</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CategoryChips() {
  return (
    <section className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      <span className="mr-1 text-sm text-[var(--color-text-subtle)]">Popular:</span>
      {categories.map((cat) => (
        <button
          key={cat}
          className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[var(--color-text-muted)] transition hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)]"
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
    <section className="mt-8 border-t border-[var(--color-border)] pt-8 pb-4">
      <div className="flex flex-wrap justify-center gap-10 sm:gap-16 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">{s.number}</div>
            <div className="mt-1 text-xs sm:text-sm text-[var(--color-text-muted)]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
