import mongoose from "mongoose"

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: String,
  completed: {
    type: Boolean,
    default: false,
  },
})

export const Todo = mongoose.model("Todo", todoSchema)