import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string; // Password is required for creation but not always selected
  role: "admin" | "user";
  country: string;
  careerStage: "Fresher" | "Graduate" | "Experienced";
  isPaidUser: boolean;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // 'select: false' hides it by default
  role: { type: String, enum: ["admin", "user"], default: "user" },
  country: { type: String, required: true },
  careerStage: {
    type: String,
    enum: ["Fresher", "Graduate", "Experienced"],
    required: true,
  },
  isPaidUser: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
