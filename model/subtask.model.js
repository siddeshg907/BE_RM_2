const mongoose = require("mongoose");

const subtaskSchema = mongoose.Schema({
  title: String,
  isCompleted: Boolean
});

const SubtaskModel = mongoose.model("subtask", subtaskSchema);

module.exports = {
  SubtaskModel
};
