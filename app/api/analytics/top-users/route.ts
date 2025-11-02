import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CVAnalysis from "@/models/CVAnalysis";

export async function GET() {
  try {
    await dbConnect();
    const topUsers = await CVAnalysis.aggregate([
      {
        $group: {
          _id: "$userId",
          averageScore: { $avg: "$score" },
          analysisCount: { $sum: 1 },
        },
      },
      { $sort: { averageScore: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          email: "$userDetails.email",
          country: "$userDetails.country",
          averageScore: { $round: ["$averageScore", 1] },
          analysisCount: 1,
        },
      },
    ]);
    return NextResponse.json(topUsers);
  } catch (error) {
    console.error("Top Users error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
