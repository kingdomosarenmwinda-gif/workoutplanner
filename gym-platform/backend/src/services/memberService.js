const prisma = require("../utils/prismaClient");

const findMemberByEmail = async (email) => {
  return prisma.member.findUnique({ where: { email } });
};

const findMemberById = async (id) => {
  return prisma.member.findUnique({ where: { id } });
};

const updateMemberStatus = async (memberId, status) => {
  return prisma.member.update({
    where: { id: memberId },
    data: { account_status: status },
  });
};

const updateMemberSubscription = async (memberId, tier) => {
  return prisma.member.update({
    where: { id: memberId },
    data: { subscription_tier: tier, account_status: "Active" },
  });
};

module.exports = {
  findMemberByEmail,
  findMemberById,
  updateMemberStatus,
  updateMemberSubscription,
};
