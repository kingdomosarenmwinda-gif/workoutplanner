const express = require("express");
const router = express.Router();
const { getExercises } = require("../controllers/exerciseController");

router.get("/exercises", getExercises);

module.exports = router;
