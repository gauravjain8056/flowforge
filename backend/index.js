require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Workflow = require("./models/Workflow"); // Import your new schema

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- NEW ROUTE: Save a Workflow ---
app.post("/api/workflows", async (req, res) => {
  try {
    const { name, nodes, edges } = req.body;

    // Create a new workflow document in MongoDB
    const newWorkflow = new Workflow({ name, nodes, edges });
    await newWorkflow.save();

    res.status(201).json({
      success: true,
      message: "Workflow saved to Atlas!",
      workflow: newWorkflow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "FlowForge API is running." });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
