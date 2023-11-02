const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['Todo', 'Doing', 'Done'],
    default: 'Todo'
  },
  subtask: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subtask' }]
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = {
  TaskModel
};
