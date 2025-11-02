import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import CVAnalysis from "@/models/CVAnalysis";
import Feedback from "@/models/Feedback";

// We don't need the authMiddleware wrapper here,
// the main middleware.ts file handles it automatically.

export async function GET(req: Request) {
  try {
    await dbConnect();

    // 1. Total Users
    const totalUsers = await User.countDocuments({ role: "user" });

    // 2. Total CV Analyses
    const totalCVAnalyses = await CVAnalysis.countDocuments();

    // 3. Average CV Score
    const avgScoreAggregation = await CVAnalysis.aggregate([
      { $group: { _id: null, averageScore: { $avg: "$score" } } },
    ]);
    const averageCVScore = avgScoreAggregation[0]?.averageScore || 0;

    // 4. Total Feedback
    const totalFeedback = await Feedback.countDocuments();

    // 5. Satisfaction (e.g., avg rating)
    const avgRatingAggregation = await Feedback.aggregate([
      { $group: { _id: null, averageRating: { $avg: "$rating" } } },
    ]);
    const averageRating = avgRatingAggregation[0]?.averageRating || 0;

    return NextResponse.json({
      totalUsers,
      totalCVAnalyses,
      averageCVScore: parseFloat(averageCVScore.toFixed(1)),
      totalFeedback,
      averageRating: parseFloat(averageRating.toFixed(1)),
    });
  } catch (error) {
    console.error("KPIs error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
