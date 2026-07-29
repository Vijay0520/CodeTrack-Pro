const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const problemRoutes = require("./routes/problemRoutes");
const statsRoutes = require("./routes/statsRoutes");
const badgeRoutes = require("./routes/badgeRoutes");

// Load environment variables
const path = require("path");

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/badges", badgeRoutes);

app.get("/api/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("Database Name:", mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("CodeTrack-Pro Backend is Running 🚀");
});

const User = require("./models/User");

app.get("/debug-users", async (req, res) => {
  try {
    const users = await User.find().select("email");

    res.json({
      database: mongoose.connection.db.databaseName,
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});