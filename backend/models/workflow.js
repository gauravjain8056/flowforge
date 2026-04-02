const mongoose = require("mongoose");

const workflowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Untitled Workflow",
    },
    // We store the React Flow nodes array exactly as it comes from the frontend
    nodes: {
      type: Array,
      default: [],
    },
    // We store the React Flow edges array exactly as it comes from the frontend
    edges: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Workflow", workflowSchema);
