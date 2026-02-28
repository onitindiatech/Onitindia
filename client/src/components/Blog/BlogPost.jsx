import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Check, ArrowUp, Share2, Copy, Twitter, Linkedin, ChevronRight } from "react-feather";
import SEO from "../SEO";
import { blogs } from "../../data/blogs";
import Footer from "../Footer";

/* -------------------------------------------------------------------------- */
/*                            STRIPE-STYLE COMPONENTS                         */
/* -------------------------------------------------------------------------- */

// The "Blurple" Accent: #635bff
const AccentText = ({ children, className = "" }) => (
  <span className={`text-[#635bff] font-semibold ${className}`}>{children}</span>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#f6f9fc] text-[#425466] border border-[#e3e8ee]">
    {children}
  </span>
);

const SectionHeading = ({ children }) => (
  <h3 className="text-[11px] font-bold text-[#425466] uppercase tracking-widest mb-4 border-b border-[#e3e8ee] pb-2">
    {children}
  </h3>
);

const AuthorCard = ({ author, date }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-[#f6f9fc] border border-[#e3e8ee] overflow-hidden">
      <img
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`}
        alt={author}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-bold text-[#0a2540] leading-tight">{author}</span>
      <span className="text-xs font-medium text-[#425466]">{date}</span>
    </div>
  </div>
);

const Callout = ({ children }) => (
  <div className="my-10 p-6 bg-[#f6f9fc] border-l-4 border-green-500 rounded-r-lg">
    <h4 className="flex items-center gap-2 text-sm font-bold text-[#0a2540] mb-3 uppercase tracking-wide">
      <Check size={14} className="text-green-500" strokeWidth={3} />
      Key Highlight
    </h4>
    <div className="text-[#425466] font-medium leading-relaxed">
      {children}
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                MAIN SCREEN                                 */
/* -------------------------------------------------------------------------- */

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Use static data lookup
    const found = blogs.find(p => p._id === id);

    if (found) {
      setPost(found);
      const words = found.description?.split(/\s+/).length || 0;
      setReadingTime(Math.ceil(words / 225));
      setLoading(false);
    } else {
      setError("We couldn't find that article.");
      setLoading(false);
    }
  }, [id]);

  const formattedDate = useMemo(() => post?.date ? new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "", [post]);

  // Loading / Error
  if (loading || error) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest text-green-500">Loading Article</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-bold text-green-500 mb-4">{error}</h1>
          <button onClick={() => navigate("/blog")} className="text-green-500 font-bold hover:underline">Return to Journal</button>
        </div>
      )}
    </div>
  );



  // ... existing code ...

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#0a2540] font-sans selection:bg-[#635bff] selection:text-white">
      {post && (
        <SEO
          title={post.title}
          description={post.description}
          image={post.image}
          keywords={post.keywords ? post.keywords.join(", ") : "OnIT blog, article"}
          canonical={`https://onitindia.com/blog/${post._id}`}
          type="article"
          schema={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "image": post.image,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "datePublished": post.date,
            "publisher": {
              "@type": "Organization",
              "name": "OnIT India",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.onitindia.com/logo.png"
              }
            }
          }}
        />
      )}

      <main className="max-w-[1040px] mx-auto px-4 md:px-6 pt-28 pb-12 md:py-12 lg:py-20">

        {/* HEADER GRID */}
        <header className="mb-8 md:mb-16">
          <div className="flex flex-col gap-4 md:gap-6 max-w-3xl">
            <button
              onClick={() => navigate("/blog")}
              className="group inline-flex items-center gap-2 text-xs md:text-sm font-bold text-[#425466] hover:text-[#0a2540] transition-colors mb-2"
            >
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border border-[#e3e8ee] flex items-center justify-center group-hover:border-[#635bff] transition-colors shadow-sm">
                <ArrowLeft size={12} className="group-hover:text-[#635bff]" />
              </div>
              Back to Journal
            </button>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 md:gap-3">
              <Pill>{post.category}</Pill>
              <span className="text-[10px] md:text-xs font-bold text-green-500 uppercase tracking-wider">{readingTime} min read</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#0a2540]"
            >
              {post.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-sm md:text-2xl text-[#425466] leading-relaxed max-w-2xl font-medium"
            >
              {post.description?.split('.')[0]}.
            </motion.p>
          </div>
        </header>

        {/* HERO IMAGE */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="w-full aspect-[2/1] md:aspect-[2.4/1] bg-[#f6f9fc] rounded-lg md:rounded-xl overflow-hidden mb-8 md:mb-16 border border-[#e3e8ee]"
        >
          <img
            src={post.image?.replace("/upload/", "/upload/f_auto,q_auto,w_1200/") || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative">

          {/* SIDEBAR (METADATA) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-32 h-fit space-y-6 md:space-y-8 order-2 lg:order-1">
            <div>
              <SectionHeading>Written By</SectionHeading>
              <AuthorCard author={post.author} date={formattedDate} />
            </div>

            <div>
              <SectionHeading>Share</SectionHeading>
              <div className="flex flex-col gap-2 items-start">
                <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="flex items-center gap-2 text-xs md:text-sm font-bold text-green-500 hover:text-[#0a2540] transition-colors">
                  <Copy size={14} /> Copy Link
                </button>

              </div>
            </div>

            {post.keywords && (
              <div>
                <SectionHeading>Topics</SectionHeading>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] md:text-xs font-bold text-white bg-green-500 px-2 py-1 rounded hover:bg-[#e3e8ee] transition-colors cursor-pointer">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* MAIN CONTENT */}
          <article className="lg:col-span-9 lg:pl-12 order-1 lg:order-2">
            {/* Intro Paragraph */}
            <div className="prose prose-sm md:prose-base lg:prose-lg prose-slate max-w-none 
                    prose-headings:text-[#0a2540] prose-headings:font-bold prose-headings:tracking-tight
                    prose-p:text-[#425466] prose-p:leading-8 prose-p:font-medium
                    prose-a:text-[#635bff] prose-a:no-underline prose-a:font-semibold hover:prose-a:underline
                    prose-img:rounded-lg prose-img:border prose-img:border-[#e3e8ee]
                 ">

              {/* Smart Content Rendering */}
              {(() => {
                if (!post.description) return null;

                // Identify a good callout sentence (short, impactful, usually early on)
                const sentences = post.description.match(/[^\.!\?]+[\.!\?]+/g) || [];
                const highlight = sentences.find(s => s.length > 40 && s.length < 120 && (s.includes("OnIT") || s.includes("lifesaver") || s.includes("empowering")));

                const lines = post.description.split('\n').filter(line => line.trim() !== '');
                const elements = [];
                let listBuffer = [];

                let paragraphCount = 0;
                let imageIndex = 0;

                lines.forEach((line, index) => {
                  const trimmed = line.trim();
                  if (highlight && trimmed.includes(highlight.trim())) {
                    // Skip
                  }

                  // List Item detection
                  if (trimmed.startsWith('- ')) {
                    listBuffer.push(trimmed.substring(2));
                  } else {
                    // Flush List
                    if (listBuffer.length > 0) {
                      elements.push(
                        <ul key={`list-${index}`} className="my-6 md:my-8 space-y-3 md:space-y-4">
                          {listBuffer.map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-[#425466]">
                              <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 shadow-sm" />
                              <span className="leading-relaxed">{item.split(':')[0]}<span className="text-[#0a2540] font-semibold">{item.includes(':') ? ':' : ''}</span>{item.split(':').slice(1).join(':')}</span>
                            </li>
                          ))}
                        </ul>
                      );
                      listBuffer = [];
                    }

                    // Header detection
                    const isHeader = trimmed.length < 80 && !trimmed.endsWith('.') && (trimmed.endsWith('?') || trimmed.includes("Benefits") || trimmed.includes("Why") || trimmed.includes("Join") || /^[A-Z][a-zA-Z\s]+$/.test(trimmed));

                    // Render
                    if (isHeader) {
                      elements.push(<h3 key={`h3-${index}`} className="text-xl md:text-3xl font-bold text-[#0a2540] mt-10 md:mt-16 mb-4 md:mb-6 tracking-tight">{trimmed}</h3>);
                    } else {
                      paragraphCount++;
                      elements.push(<p key={`p-${index}`} className="mb-4 md:mb-6 leading-7 md:leading-8 text-[#425466]">{trimmed.replace(highlight || "xyz_impossible", "").trim() || trimmed}</p>);

                      // Interleave Images (e.g., after 2nd and 5th paragraphs)
                      if ((paragraphCount === 2 || paragraphCount === 5) && post.additionalImages && post.additionalImages[imageIndex]) {
                        elements.push(
                          <div key={`img-${index}`} className="my-6 md:my-10 rounded-xl overflow-hidden border border-[#e3e8ee]">
                            <img
                              src={post.additionalImages[imageIndex].replace("/upload/", "/upload/f_auto,q_auto,w_1200/")}
                              alt="Blog detail"
                              className="w-full h-[200px] md:h-[450px] object-cover"
                            />
                          </div>
                        );
                        imageIndex++;
                      }
                    }
                  }
                });

                // Flush remaining list
                if (listBuffer.length > 0) {
                  elements.push(
                    <ul key={`list-end`} className="my-8 space-y-4">
                      {listBuffer.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-[#425466]">
                          <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 shadow-sm" />
                          <span className="leading-relaxed"><strong className="text-[#0a2540]">{item.split(':')[0]}</strong>{item.includes(':') ? ':' : ''} {item.split(':').slice(1).join(':')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                return elements;
              })()}
            </div>
          </article>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default BlogPost;
