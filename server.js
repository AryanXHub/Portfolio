const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb://aryangaur369_db_user:v9U8CU%2EcRLJqQhg@ac-nekbcay-shard-00-00.sfmahkq.mongodb.net:27017,ac-nekbcay-shard-00-01.sfmahkq.mongodb.net:27017,ac-nekbcay-shard-00-02.sfmahkq.mongodb.net:27017/portfolioDB?ssl=true&replicaSet=atlas-yiupbq-shard-0&authSource=admin&retryWrites=true&w=majority",
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  link: String,
});

const Project = mongoose.model("Project", projectSchema);

app.post("/api/projects", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/projects/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Portfolio API is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
