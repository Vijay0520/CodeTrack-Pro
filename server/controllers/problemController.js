const Problem = require("../models/Problem");

// Create Problem
const createProblem = async (req, res) => {
  try {
    const { title, difficulty, status, link } = req.body;

    const problem = await Problem.create({
      title,
      difficulty,
      status,
      link,
      user: req.user.id,
    });

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

    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
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