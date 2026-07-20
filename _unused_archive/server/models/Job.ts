import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    applyUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
