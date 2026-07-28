const express = require("express");
const router = express.Router();

const {
  getStats,
  getContributions,
  getMonthlyAnalytics,
  getDifficultyAnalytics,
  getTopicAnalytics,
  getCompanyAnalytics,
  getLast30DaysTrend,
} = require("../controllers/statsController");

const authMiddleware = require("../middleware/authMiddleware");

// Get Streak Stats
router.get("/", authMiddleware, getStats);

// Get Contribution Calendar Data
router.get("/contributions", authMiddleware, getContributions);

// Get Monthly Analytics
router.get("/monthly", authMiddleware, getMonthlyAnalytics);

// Get Difficulty Analytics
router.get("/difficulty", authMiddleware, getDifficultyAnalytics);

router.get("/topics", authMiddleware, getTopicAnalytics);

router.get("/companies", authMiddleware, getCompanyAnalytics);

router.get("/last30days", authMiddleware, getLast30DaysTrend);
module.exports = router;