import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../Footer";
import SEO from "../SEO";
import { Trash2, Search, ArrowUpRight, Clock, ChevronRight } from "react-feather";
import { blogs as staticBlogs } from "../../data/blogs";

/* -------------------------------------------------------------------------- */
/*                                  UTILS                                     */
/* -------------------------------------------------------------------------- */

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const calculateReadingTime = (text) => {
  if (!text) return 1;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 225);
};

const cloudImg = (url) =>
  url?.includes("/upload/")
    ? url.replace("/upload/", "/upload/f_auto,q_auto,w_1200/") // Optimized for high DPI
    : url;

/* -------------------------------------------------------------------------- */
/*                                SKELETONS                                   */
/* -------------------------------------------------------------------------- */

const SkeletonHero = () => (
  <div className="w-full bg-zinc-50 rounded-[2rem] p-8 md:p-12 animate-pulse flex flex-col md:flex-row gap-12 min-h-[500px]">
    <div className="flex-1 flex flex-col justify-center space-y-6">
      <div className="w-32 h-6 bg-zinc-200 rounded-full" />
      <div className="w-full h-16 bg-zinc-200 rounded-xl" />
      <div className="w-3/4 h-16 bg-zinc-200 rounded-xl" />
      <div className="w-full h-24 bg-zinc-200 rounded-xl mt-4" />
    </div>
    <div className="flex-1 bg-zinc-200 rounded-xl h-64 md:h-auto" />
  </div>
);

const SkeletonCard = () => (
  <div className="flex flex-col space-y-4">
    <div className="aspect-[4/3] bg-zinc-100 rounded-2xl animate-pulse" />
    <div className="h-6 bg-zinc-100 rounded w-3/4 animate-pulse" />
    <div className="h-4 bg-zinc-100 rounded w-full animate-pulse" />
    <div className="h-4 bg-zinc-100 rounded w-1/2 animate-pulse" />
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                COMPONENTS                                  */
/* -------------------------------------------------------------------------- */

const CategoryPill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
      ${active ? "text-white" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"}
    `}
  >
    {active && (
      <motion.div
        layoutId="activePill"
        className="absolute inset-0 bg-zinc-900 rounded-full"
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    <span className="relative z-10">{label}</span>
  </button>
);

const SearchInput = ({ value, onChange }) => (
  <div className="relative group w-full md:w-80">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-zinc-800 transition-colors" />
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search articles..."
      className="
        block w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl
        text-sm font-medium text-zinc-900 placeholder-zinc-400
        focus:bg-white focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300
        transition-all duration-200 outline-none
      "
    />
  </div>
);

const BlogCard = React.forwardRef(({ post, onClick, isAdmin, onDelete }, ref) => (
  <motion.article
    layout
    ref={ref}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ y: -4 }}
    className="group cursor-pointer flex flex-col h-full"
    onClick={onClick}
  >
    <div className="relative aspect-[16/9] md:aspect-[4/3] mb-6 overflow-hidden rounded-2xl bg-zinc-100">
      <motion.img
        src={cloudImg(post.image)}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute top-4 left-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-zinc-900 shadow-sm">
          {post.category}
        </span>
      </div>
    </div>

    <div className="flex flex-col flex-1">
      <div className="flex items-center gap-3 text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wider">
        <span>{formatDate(post.date)}</span>
        <span className="w-1 h-1 rounded-full bg-zinc-300" />
        <span className="flex items-center gap-1">
          <Clock size={12} /> {calculateReadingTime(post.description)} min read
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 leading-tight group-hover:text-zinc-700 transition-colors">
        {post.title}
      </h3>

      <p className="text-zinc-500 line-clamp-2 md:line-clamp-3 mb-6 text-sm leading-relaxed md:text-base flex-1">
        {post.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 md:gap-3">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`}
            alt={post.author}
            className="w-8 h-8 rounded-full bg-zinc-100"
          />
          <span className="text-xs md:text-sm font-semibold text-zinc-700">{post.author}</span>
        </div>

        {isAdmin ? (
          <button
            onClick={(e) => onDelete(e, post._id)}
            className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 size={16} />
          </button>
        ) : (
          <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:border-zinc-900 group-hover:text-zinc-900 transition-colors">
            <ArrowUpRight size={16} />
          </div>
        )}
      </div>
    </div>
  </motion.article>
));

/* -------------------------------------------------------------------------- */
/*                                MAIN SCREEN                                 */
/* -------------------------------------------------------------------------- */



function BlogList() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(staticBlogs || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, blogs]);

  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const gridBlogs = filteredBlogs.length > 0 ? filteredBlogs.slice(1) : [];

  const categories = useMemo(() => {
    const cats = new Set(blogs.map((blog) => blog.category));
    return ["All", ...Array.from(cats)];
  }, [blogs]);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this post?")) {
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    }
  };

  return (
    <div className="bg-white min-h-screen text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      <SEO
        title="The Journal | Insights & Updates"
        description="Stay updated with the latest insights, success stories, and developments from OnIT India. Your guide to the gig economy and campus life."
        keywords="OnIT blog, gig economy, campus opportunities, startup updates, flexible work news"
        canonical="https://onitindia.com/blog"
      />
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 pt-28 md:pt-24 pb-32">

        {/* Header */}
        <header className="flex flex-col md:flex-row gap-6 mb-8 md:mb-20">
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="w-full md:w-80">
              <SearchInput value={searchQuery} onChange={setSearchQuery} />
            </div>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
              The <span className="text-green-600">Journal</span>.
            </h1>
            <p className="text-base md:text-xl text-zinc-500 font-medium max-w-lg leading-relaxed">
              Insights, updates, and stories from the Onit team.
            </p>
          </div>
        </header>

        {/* Hero Section */}
        {loading && page === 1 ? (
          <SkeletonHero />
        ) : (
          featuredBlog && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 md:mb-24 group cursor-pointer"
              onClick={() => navigate(`/blog/${featuredBlog._id}`)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center bg-zinc-50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 transition-all duration-500 hover:bg-[#F4F4F5]">
                <div className="order-2 lg:order-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4 md:mb-8">
                    <span className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      Featured
                    </span>
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                      {calculateReadingTime(featuredBlog.description)} min read
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-4 md:mb-8 leading-[1.1] group-hover:text-zinc-700 transition-colors">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-sm md:text-xl text-zinc-500 leading-relaxed mb-6 md:mb-10 line-clamp-3">
                    {featuredBlog.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${featuredBlog.author}`}
                        alt={featuredBlog.author}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-zinc-100"
                      />
                    </div>
                    <div className="text-xs md:text-sm">
                      <p className="font-bold text-zinc-900">{featuredBlog.author}</p>
                      <p className="text-zinc-400 font-medium">{formatDate(featuredBlog.date)}</p>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={(e) => handleDelete(e, featuredBlog._id)}
                        className="ml-auto p-3 text-zinc-300 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="order-1 lg:order-2 relative aspect-[16/9] lg:aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl md:shadow-2xl shadow-zinc-200">
                  <img
                    src={cloudImg(featuredBlog.image)}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.section>
          )
        )}

        {/* Categories (Moved) */}
        <div className="flex items-center gap-2 mb-10 md:mb-16 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* Grid Section */}
        {gridBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-x-10 md:gap-y-16">
            <AnimatePresence mode="popLayout">
              {gridBlogs.map((post) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  onClick={() => navigate(`/blog/${post._id}`)}
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>

            {/* Load More Trigger (Simplistic for senior vibe) */}
            {filteredBlogs.length > filteredBlogs.length && (
              <div ref={() => setPage(p => p + 1)} className="h-10 w-full" />
            )}
          </div>
        ) : (
          !loading && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-300">
                <Search />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">No articles found</h3>
              <p className="text-zinc-500 mt-2">Try adjusting your search or category.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All") }}
                className="mt-6 text-green-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )
        )}

        {/* Infinite Scroll / Load More */}
        {(!searchQuery && blogs.length > 0) && (
          <div className="mt-32 flex justify-center">
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="group flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-full font-bold transition-all hover:bg-zinc-800 active:scale-95"
            >
              Load more stories
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default BlogList;
