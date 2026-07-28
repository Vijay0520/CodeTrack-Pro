const Problem = require("../models/Problem");

 const getBadges = async (req, res) => {
  try {
    const userId = req.user.id;

    const problems = await Problem.find({ user: userId });

    const solved = problems.filter(
      (p) => p.status === "Solved"
    );

    const easy = solved.filter(
      (p) => p.difficulty === "Easy"
    ).length;

    const medium = solved.filter(
      (p) => p.difficulty === "Medium"
    ).length;

    const hard = solved.filter(
      (p) => p.difficulty === "Hard"
    ).length;

    const badges = [
      {
        id: "first-solve",
        title: "First Solve",
        icon: "🥉",
        unlocked: solved.length >= 1,
      },
      {
        id: "beginner",
        title: "Beginner Coder",
        icon: "🌱",
        unlocked: solved.length >= 10,
      },
      {
        id: "problem-solver",
        title: "Problem Solver",
        icon: "💪",
        unlocked: solved.length >= 50,
      },
      {
        id: "century",
        title: "Century Club",
        icon: "💯",
        unlocked: solved.length >= 100,
      },
      {
        id: "legend",
        title: "Legend",
        icon: "👑",
        unlocked: solved.length >= 500,
      },
      {
        id: "easy-master",
        title: "Easy Explorer",
        icon: "🟢",
        unlocked: easy >= 20,
      },
      {
        id: "medium-master",
        title: "Medium Master",
        icon: "🟡",
        unlocked: medium >= 20,
      },
      {
        id: "hard-master",
        title: "Hard Challenger",
        icon: "🔴",
        unlocked: hard >= 20,
      },
    ];

    res.json(badges);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getBadges,
};