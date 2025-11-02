import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();
    const userDemographics = await User.aggregate([
      { $match: { role: "user" } },
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 7 },
      { $project: { name: "$_id", count: 1, _id: 0 } },
    ]);
    return NextResponse.json(userDemographics);
  } catch (error) {
    console.error("User Demographics error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
