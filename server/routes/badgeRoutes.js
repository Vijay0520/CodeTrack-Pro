const express = require("express");
const router = express.Router();

const { getBadges } = require("../controllers/badgeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getBadges);

module.exports = router;