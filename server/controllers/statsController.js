const mongoose = require("mongoose");
const UserStats = require("../models/UserStats");
const Problem = require("../models/Problem");


// Get Streak Stats
const getStats = async (req, res) => {
  try {
    let stats = await UserStats.findOne({ user: req.user.id });

    if (!stats) {
      stats = {
        currentStreak: 0,
        bestStreak: 0,
      };
    }

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Contribution Data
const getContributions = async (req, res) => {
  try {
     console.log("req.user =", req.user);
    console.log("req.user.id =", req.user.id);
    console.log("req.user._id =", req.user._id);
    const contributions = await Problem.aggregate([
      {
        $match: {
  user: new mongoose.Types.ObjectId(req.user.id),
  status: "Solved",
  solvedAt: { $ne: null },
},
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$solvedAt",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.status(200).json(contributions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMonthlyAnalytics = async (req, res) => {
  try {
    const analytics = await Problem.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          status: "Solved",
          solvedAt: { $ne: null },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$solvedAt" },
            month: { $month: "$solvedAt" },
          },
          solved: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const result = analytics.map((item) => ({
      month: monthNames[item._id.month - 1],
      year: item._id.year,
      solved: item.solved,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDifficultyAnalytics = async (req, res) => {
  try {
    const analytics = await Problem.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          status: "Solved",
        },
      },
      {
        $group: {
          _id: "$difficulty",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const result = analytics.map((item) => ({
      difficulty: item._id,
      count: item.count,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTopicAnalytics = async (req, res) => {
  try {
    const analytics = await Problem.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          status: "Solved",
        },
      },
      {
        $group: {
          _id: "$topic",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    const result = analytics.map((item) => ({
      topic: item._id,
      count: item.count,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getCompanyAnalytics = async (req, res) => {
  try {
    const analytics = await Problem.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          status: "Solved",
        },
      },
      {
        $group: {
          _id: "$company",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const result = analytics.map((item) => ({
      company: item._id || "Unknown",
      count: item.count,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLast30DaysTrend = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);

    const analytics = await Problem.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          status: "Solved",
          solvedAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$solvedAt",
            },
          },
          solved: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStats,
  getContributions,
  getMonthlyAnalytics,
  getDifficultyAnalytics,
  getTopicAnalytics,
  getCompanyAnalytics,
  getLast30DaysTrend,
};