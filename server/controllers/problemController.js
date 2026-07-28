const Problem = require("../models/Problem");
const UserStats = require("../models/UserStats");

// Create Problem
const createProblem = async (req, res) => {
  try {
    const {
      title,
      difficulty,
      topic,
      company,
      status,
      link,
      notes,
      favorite,
      revision,
    } = req.body;

    const problem = await Problem.create({
      title,
      difficulty,
      topic,
      company,
      status,
      link,
      notes,
      favorite,
      revision,
      solvedAt: status === "Solved" ? new Date() : null,
      user: req.user.id,
    });

    console.log("Problem created");
    console.log("Status:", status);

    // ===========================
    // Update Coding Streak
    // ===========================
    if (status === "Solved") {
      let stats = await UserStats.findOne({ user: req.user.id });

      if (!stats) {
        stats = await UserStats.create({
          user: req.user.id,
          currentStreak: 1,
          bestStreak: 1,
          lastSolvedDate: new Date(),
        });
      } else {
        const today = new Date();
        const lastSolved = stats.lastSolvedDate
          ? new Date(stats.lastSolvedDate)
          : null;

        if (!lastSolved) {
          stats.currentStreak = 1;
        } else {
          const diffDays = Math.floor(
            (today.setHours(0, 0, 0, 0) -
              lastSolved.setHours(0, 0, 0, 0)) /
              (1000 * 60 * 60 * 24)
          );

          if (diffDays === 1) {
            stats.currentStreak += 1;
          } else if (diffDays > 1) {
            stats.currentStreak = 1;
          }
          // diffDays === 0 -> Same day, no change
        }

        stats.bestStreak = Math.max(
          stats.bestStreak,
          stats.currentStreak
        );

        stats.lastSolvedDate = new Date();

        await stats.save();
      }
    }

    res.status(201).json({
      message: "Problem Added Successfully",
      problem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Problems
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Problem
const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    const updateData = { ...req.body };

    // If problem is changed from Unsolved -> Solved
    if (
      req.body.status === "Solved" &&
      problem.status !== "Solved"
    ) {
      updateData.solvedAt = new Date();
    }

    // If problem is changed from Solved -> Unsolved
    if (
      req.body.status === "Unsolved" &&
      problem.status === "Solved"
    ) {
      updateData.solvedAt = null;
    }

    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Problem Updated Successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Problem
const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    await Problem.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Problem Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProblem,
  getProblems,
  updateProblem,
  deleteProblem,
};