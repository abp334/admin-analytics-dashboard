import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();
    const paidVsFree = await User.aggregate([
      { $match: { role: "user" } },
      { $group: { _id: "$isPaidUser", count: { $sum: 1 } } },
      {
        $project: {
          name: { $cond: { if: "$_id", then: "Paid", else: "Free" } },
          value: "$count",
          _id: 0,
        },
      },
    ]);
    return NextResponse.json(paidVsFree);
  } catch (error) {
    console.error("Paid vs Free error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
