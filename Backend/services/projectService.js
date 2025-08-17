const projectsData = require("../data/projects");

// GET ALL PROJECTS
const getAllProjects = () => {
  return projectsData.projects;
};

// GET SINGLE PROJECT BY ID
const getProjectById = (id) => {
  return projectsData.projects.find((project) => project.id === Number(id));
};

// CREATE NEW PROJECT
const createProject = (projectData) => {
  const newProject = {
    id: projectsData.nextId,
    ...projectData,
  };
  projectsData.projects.push(newProject);
  projectsData.nextId++;
  return newProject;
};

// UPDATE PROJECT
const updateProject = (id, projectData) => {
  const index = projectsData.projects.findIndex((project) => project.id === Number(id));
  if (index !== -1) {
    projectsData.projects[index] = { ...projectsData.projects[index], ...projectData };
    return projectsData.projects[index];
  }
  return null;
};

// DELETE PROJECT
const deleteProject = (id) => {
  const index = projectsData.projects.findIndex((project) => project.id === Number(id));
  if (index !== -1) {
    return projectsData.projects.splice(index, 1)[0];
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