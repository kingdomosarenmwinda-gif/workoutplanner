const prisma = require("./utils/prismaClient");

const members = [
  { name: "Alice Johnson", email: "alice@example.com", subscription_tier: "VIP", account_status: "Active", signed_waiver: true },
  { name: "Bob Smith", email: "bob@example.com", subscription_tier: "Performance", account_status: "Delinquent", signed_waiver: true },
  { name: "Carol Davis", email: "carol@example.com", subscription_tier: "Basic", account_status: "Frozen", signed_waiver: false },
  { name: "David Wilson", email: "david@example.com", subscription_tier: "VIP", account_status: "Active", signed_waiver: true },
  { name: "Eve Martinez", email: "eve@example.com", subscription_tier: "Basic", account_status: "Active", signed_waiver: true },
];

const classes = [
  { title: "Morning HIIT", coach: "Coach Mike", max_capacity: 12, start_time: new Date("2026-10-20T06:00:00Z"), duration: 45 },
  { title: "Evening Yoga", coach: "Coach Sarah", max_capacity: 20, start_time: new Date("2026-10-20T18:00:00Z"), duration: 60 },
  { title: "Strength Training", coach: "Coach Mike", max_capacity: 10, start_time: new Date("2026-10-21T07:00:00Z"), duration: 60 },
  { title: "Spin Class", coach: "Coach Lisa", max_capacity: 15, start_time: new Date("2026-10-21T12:00:00Z"), duration: 45 },
  { title: "Pilates", coach: "Coach Sarah", max_capacity: 8, start_time: new Date("2026-10-22T09:00:00Z"), duration: 50 },
];

const exercises = [
  { name: "Back Squat", target_muscle: "Quadriceps", difficulty: "Intermediate", video_url: "https://example.com/videos/back-squat.mp4" },
  { name: "Deadlift", target_muscle: "Hamstrings", difficulty: "Intermediate", video_url: "https://example.com/videos/deadlift.mp4" },
  { name: "Bench Press", target_muscle: "Chest", difficulty: "Beginner", video_url: "https://example.com/videos/bench-press.mp4" },
  { name: "Overhead Press", target_muscle: "Shoulders", difficulty: "Beginner", video_url: "https://example.com/videos/overhead-press.mp4" },
  { name: "Pull-Up", target_muscle: "Back", difficulty: "Advanced", video_url: "https://example.com/videos/pull-up.mp4" },
  { name: "Lunges", target_muscle: "Glutes", difficulty: "Beginner", video_url: "https://example.com/videos/lunges.mp4" },
  { name: "Plank", target_muscle: "Core", difficulty: "Beginner", video_url: "https://example.com/videos/plank.mp4" },
  { name: "Barbell Row", target_muscle: "Back", difficulty: "Intermediate", video_url: "https://example.com/videos/barbell-row.mp4" },
];

const seed = async () => {
  try {
    for (const m of members) {
      await prisma.member.upsert({
        where: { email: m.email },
        update: m,
        create: m,
      });
    }

    for (const c of classes) {
      await prisma.class.upsert({
        where: { id: c.id || "placeholder" },
        update: c,
        create: c,
      });
    }

    for (const e of exercises) {
      await prisma.exercise.upsert({
        where: { id: e.id || "placeholder" },
        update: e,
        create: e,
      });
    }

    console.log("Seed data created successfully");
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
