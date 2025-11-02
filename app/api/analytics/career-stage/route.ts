import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();
    const careerStage = await User.aggregate([
      { $match: { role: "user" } },
      { $group: { _id: "$careerStage", count: { $sum: 1 } } },
      { $project: { name: "$_id", count: 1, _id: 0 } },
    ]);
    return NextResponse.json(careerStage);
  } catch (error) {
    console.error("Career Stage error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
