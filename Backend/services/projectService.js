const { projects, nextId } = require("../data/projects");

// GET ALL PROJECTS
const getAllProjects = () => {
  return projects;
};

// GET SINGLE PROJECT BY ID
const getProjectById = (id) => {
  return projects.find((project) => project.id === Number(id));
};

// CREATE NEW PROJECT
const createProject = (projectData) => {
  const newProject = {
    id: nextId,
    ...projectData,
  };
  projects.push(newProject);
  nextId++;
  return newProject;
};

// UPDATE PROJECT
const updateProject = (id, projectData) => {
  const index = projects.findIndex((project) => project.id === Number(id));
  if (index !== -1) {
    projects[index] = { ...projects[index], ...projectData };
    return projects[index];
  }
  return null;
};

// DELETE PROJECT
const deleteProject = (id) => {
  const index = projects.findIndex((project) => project.id === Number(id));
  if (index !== -1) {
    return projects.splice(index, 1)[0];
  }
  return null;
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
