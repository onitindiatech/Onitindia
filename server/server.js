import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ----------------------------------------
    GLOBAL MIDDLEWARE
---------------------------------------- */
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ----------------------------------------
    CLOUDINARY SETUP
---------------------------------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/* ----------------------------------------
    MULTER + CLOUDINARY STORAGE
---------------------------------------- */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "onit_blog_images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

/* ----------------------------------------
    IMAGE UPLOAD API
---------------------------------------- */
app.post("/api/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Upload failed" });
  return res.json({ url: req.file.path });
});

/* ----------------------------------------
    MONGODB CONNECTION
---------------------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

/* ----------------------------------------
    MODELS
---------------------------------------- */
const Blog = mongoose.model("Blog", {
  title: String,
  author: String,
  category: String,
  description: String,
  image: String,
  image2: String,
  image3: String,
  keywords: [String],
  date: { type: Date, default: Date.now },
});

const Admin = mongoose.model("Admin", {
  email: String,
  password: String,
});

/* ----------------------------------------
    ADD BLOG
---------------------------------------- */
app.post("/api/add-blog", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.json({ message: "Blog added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save blog" });
  }
});

/* ----------------------------------------
    GET BLOGS WITH PAGINATION + OPTIMIZED FIELDS
---------------------------------------- */
app.get("/api/blogs", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const blogs = await Blog.find({}, "title author category description image date")
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  res.json(blogs);
});

/* ----------------------------------------
    GET SINGLE BLOG (FULL DATA)
---------------------------------------- */
app.get("/api/blog/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

/* ----------------------------------------
    DELETE BLOG
---------------------------------------- */
app.delete("/api/delete-blog/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

/* ----------------------------------------
    ADMIN LOGIN
---------------------------------------- */
app.post("/api/admin-login", async (req, res) => {
  const admin = await Admin.findOne(req.body);
  if (!admin) return res.status(401).json({ message: "Invalid login" });
  res.json({ message: "Login success" });
});

/* ----------------------------------------
    START SERVER
---------------------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
