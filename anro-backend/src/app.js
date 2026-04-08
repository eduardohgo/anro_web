const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./modules/auth/auth.routes");
const podcastRoutes = require("./modules/podcast/podcast.routes");
const uploadRoutes = require("./modules/upload/upload.routes");
const publicRoutes = require("./modules/public/public.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.json({ message: "ANRO backend running" });
});

app.use("/api/admin/auth", authRoutes);
app.use("/api", podcastRoutes);
app.use("/api", uploadRoutes);
app.use("/api", publicRoutes);

module.exports = app;