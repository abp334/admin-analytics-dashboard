import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CVAnalysis from "@/models/CVAnalysis";

export async function GET() {
  try {
    await dbConnect();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const cvUsage = await CVAnalysis.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { date: "$_id", count: 1, _id: 0 } },
    ]);
    return NextResponse.json(cvUsage);
  } catch (error) {
    console.error("CV Usage error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
