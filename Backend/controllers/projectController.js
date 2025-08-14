const projectService = require("../services/projectService");

// GET ALL PROJECTS
const getProjects = (req, res) => {
  try {
    const projects = projectService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PROJECT
const getProject = (req, res) => {
  try {
    const project = projectService.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE PROJECT
const createProject = (req, res) => {
  try {
    const { name, description, status } = req.body;
    if (!name || !description || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProject = projectService.createProject({
      name,
      description,
      status,
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROJECT
const updateProject = (req, res) => {
  try {
    const updatedProject = projectService.updateProject(
      req.params.id,
      req.body
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROJECT
const deleteProject = (req, res) => {
  try {
    const deletedProject = projectService.deleteProject(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
