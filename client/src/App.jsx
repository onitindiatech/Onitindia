import React, { useEffect } from "react"; // ✅ Import useEffect here
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./components/Landingpage";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import Domain from "./components/Domains";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Task_see from "./components/task_seeker";
import Task_Performers from "./components/Task_Performers";
import WhyChooseUs from "./components/WhyChooseUs";
import Partner from "./components/Partner";
import Team from "./components/Team";
import KnowAboutUs from "./components/KnowAboutUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import AdminLogin from "./components/Blog/AdminLogin";
import AdminDashboard from "./components/Blog/AdminDashboard";
import AddPost from "./components/Blog/AddPost";
import BlogList from "./components/Blog/BlogList";
import BlogPost from "./components/Blog/BlogPost";
import Campus from "./components/Campus.jsx";
import CampusDetail from "./components/CampusDetail";
import SEO from "./components/SEO";

function Home() {
  return (
    <>
      <SEO
        title="Flexible Local Work Platform"
        description="OnIT India: Hyperlocal task and opportunity platform. Connect with people who need help or are ready to help instantly, locally, and with zero commission."
        keywords="OnIT India, OnIT Campus, campus task platform, gig platform, flexible jobs, local work, zero commission"
        canonical="https://www.onitindia.com/"
      />
      <section id="home"><Landingpage /></section>
      <section id="knowaboutus"><KnowAboutUs /></section>
      <section id="tasksee"><Task_see /></section>
      <section id="domain"><Domain /></section>
      <section id="whychooseus"><WhyChooseUs /></section>
      {/* <section id="partner"><Partner /></section> */}
      <section id="team"><Team /></section>
      <section id="Campus"><Campus /></section>
      <section id="marquee"><Marquee /></section>
      <section id="testimonials"><Testimonials /></section>
      <section id="footer"><Footer /></section>
    </>
  );
}
import ScrollToTop from "./components/ScrollToTop";

function App() {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-HDDWFT5Z6C";
    document.head.appendChild(script1);
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-HDDWFT5Z6C');
    `;
    document.head.appendChild(script2);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen w-full bg-gray-100 overflow-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task-performers" element={<Task_Performers />} />
          <Route path="/campus-detail" element={<CampusDetail />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
