// IN-MEMORY DATA STORE
let projects = [
  {
    id: 1,
    name: "Portfolio Website",
    description: "Build a personal portfolio website",
    status: "completed",
  },
  {
    id: 2,
    name: "E-commerce API",
    description: "Develop backend for online store",
    status: "ongoing",
  },
];

let nextId = 3;

module.exports = { projects, nextId };
