const prisma = require("../utils/prismaClient");
const { asyncHandler } = require("../utils/errors");

const getExercises = asyncHandler(async (req, res) => {
  const exercises = await prisma.exercise.findMany({
    orderBy: { name: "asc" },
  });
  res.status(200).json(exercises);
});

module.exports = { getExercises };
