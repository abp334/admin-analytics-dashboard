// We run this file with 'ts-node'
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import CVAnalysis from "../models/CVAnalysis";
import Feedback from "../models/Feedback";

// Load environment variables from .env.local
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI!;

const countries = [
  "USA",
  "India",
  "UK",
  "Canada",
  "Australia",
  "Germany",
  "France",
];
const careerStages: ("Fresher" | "Graduate" | "Experienced")[] = [
  "Fresher",
  "Graduate",
  "Experienced",
];

const getRandomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const seedDatabase = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env.local");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected.");

    // Clear existing data
    console.log("Clearing old data...");
    await User.deleteMany({});
    await CVAnalysis.deleteMany({});
    await Feedback.deleteMany({});
    console.log("Old data cleared.");

    // --- Create Admin User ---
    console.log("Creating admin user...");
    const adminPassword = "admin123";
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      email: "admin@example.com",
      password: hashedAdminPassword,
      role: "admin",
      country: "USA",
      careerStage: "Experienced",
      isPaidUser: true,
    });
    console.log("Admin user created (admin@example.com / admin123)");

    // --- Create Fake Users ---
    console.log("Creating fake users...");
    const users = [];
    const userPassword = await bcrypt.hash("user123", 10);

    for (let i = 0; i < 200; i++) {
      users.push({
        email: `user${i}@example.com`,
        password: userPassword,
        role: "user",
        country: getRandomElement(countries),
        careerStage: getRandomElement(careerStages),
        isPaidUser: Math.random() < 0.3, // 30% are paid users
        createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
      });
    }
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} fake users created.`);

    // --- Create Fake CV Analyses ---
    console.log("Creating fake CV analyses...");
    const cvAnalyses = [];
    for (const user of createdUsers) {
      const analysesCount = Math.floor(Math.random() * 10); // 0-9 analyses per user
      for (let i = 0; i < analysesCount; i++) {
        cvAnalyses.push({
          userId: user._id,
          score: Math.floor(Math.random() * 61) + 40, // Score between 40 and 100
          createdAt: getRandomDate(user.createdAt, new Date()),
        });
      }
    }
    await CVAnalysis.insertMany(cvAnalyses);
    console.log(`${cvAnalyses.length} CV analyses created.`);

    // --- Create Fake Feedback ---
    console.log("Creating fake feedback...");
    const feedbacks = [];
    for (const user of createdUsers) {
      if (Math.random() < 0.5) {
        // 50% of users leave feedback
        feedbacks.push({
          userId: user._id,
          rating: Math.floor(Math.random() * 3) + 3, // Rating between 3 and 5
          createdAt: getRandomDate(user.createdAt, new Date()),
        });
      }
    }
    await Feedback.insertMany(feedbacks);
    console.log(`${feedbacks.length} feedback entries created.`);

    console.log("--- Database Seeded Successfully! ---");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedDatabase();
