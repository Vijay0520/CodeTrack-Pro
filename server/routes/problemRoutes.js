const express = require("express");
const router = express.Router();

const { createProblem,getProblems,updateProblem,deleteProblem, } = require("../controllers/problemController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createProblem);
router.get("/", authMiddleware, getProblems);
router.put("/:id", authMiddleware, updateProblem);
router.delete("/:id", authMiddleware, deleteProblem);

module.exports = router;