import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    prioritylevel: { type: String, required: true },
    start: { type: String, required: true },
    finish: { type: String, required: true },
    duration: { type: Number, default: 0, required: true },
    isDone: { type: Boolean, default: false, required: true },
    date: { type: Date, default: new Date(), required: true },
    createdAt: {
      type: Date,
      default: new Date(),
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;