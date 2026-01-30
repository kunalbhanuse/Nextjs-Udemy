import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title can not exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Title can not exceed 500 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
export default Todo;
