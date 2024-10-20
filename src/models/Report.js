import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    publication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publication",
      required: true
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    reason: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);