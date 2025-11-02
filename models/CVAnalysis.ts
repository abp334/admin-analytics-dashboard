import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICVAnalysis extends Document {
  userId: Types.ObjectId;
  score: number;
  createdAt: Date;
}

const CVAnalysisSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.CVAnalysis ||
  mongoose.model<ICVAnalysis>("CVAnalysis", CVAnalysisSchema);
