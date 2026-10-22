const prisma = require("../utils/prismaClient");
const { ConflictError, NotFoundError, ValidationError } = require("../utils/errors");

const validateBooking = async (memberId, classId) => {
  const member = await prisma.member.findUnique({ where: { id: memberId } });
  if (!member) {
    throw new NotFoundError("Member not found");
  }

  if (member.account_status !== "Active") {
    throw new ValidationError(`Account status is ${member.account_status}. Only Active members can book classes.`);
  }

  const fitnessClass = await prisma.class.findUnique({ where: { id: classId } });
  if (!fitnessClass) {
    throw new NotFoundError("Class not found");
  }

  const bookingCount = await prisma.booking.count({ where: { class_id: classId } });
  if (bookingCount >= fitnessClass.max_capacity) {
    throw new ConflictError("Class is at full capacity");
  }

  const existingBooking = await prisma.booking.findFirst({
    where: { member_id: memberId, class_id: classId },
  });
  if (existingBooking) {
    throw new ConflictError("Member already booked for this class");
  }

  return { member, fitnessClass };
};

const createBooking = async (memberId, classId) => {
  return prisma.booking.create({
    data: { member_id: memberId, class_id: classId },
    include: { member: true, class: true },
  });
};

module.exports = { validateBooking, createBooking };
