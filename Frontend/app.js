const API_URL = "http://localhost:3000/api/projects";

const projectForm = document.getElementById("projectForm");
const projectsContainer = document.getElementById("projectsContainer");

// LOAD PROJECTS ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
  fetchProjects();
});

// FETCH PROJECTS FROM BACKEND
async function fetchProjects() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch projects");

    const projects = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.error("Error:", error);
    projectsContainer.innerHTML =
      "<p>Error loading projects. Please try again.</p>";
  }
}

function displayProjects(projects) {
  if (projects.length === 0) {
    projectsContainer.innerHTML =
      "<p>No projects found. Add your first project!</p>";
    return;
  }

  projectsContainer.innerHTML = projects
    .map(
      (project) => `
    <div class="project-card">
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <p class="status-${project.status}">Status: ${project.status}</p>
      <div class="project-actions">
        <button onclick="editProject(${project.id})">Edit</button>
        <button onclick="deleteProject(${project.id})">Delete</button>
      </div>
    </div>
  `
    )
    .join("");
}

// HANDLE FORM SUBMISSION
projectForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;

  try {
    if (editingProjectId) {
      // Edit mode: send PUT request
      const response = await fetch(`${API_URL}/${editingProjectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, status }),
      });
      if (!response.ok) throw new Error("Failed to update project");
      editingProjectId = null;
    } else {
      // Create mode: send POST request
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, status }),
      });
      if (!response.ok) throw new Error("Failed to add project");
    }

    projectForm.reset();
    fetchProjects();
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to save project. Please try again.");
  }
});

// DELETE PROJECT FUNCTIONALITY
async function deleteProject(id) {
  if (!confirm("Are you sure you want to delete this project?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete project");

    fetchProjects();
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to delete project. Please try again.");
  }
}

let editingProjectId = null;

// EDIT PROJECT FUNCTIONALITY
function editProject(id) {
  const project = Array.from(
    projectsContainer.querySelectorAll(".project-card")
  )
    .map((card) => ({
      id: Number(
        card
          .querySelector('button[onclick^="editProject"]')
          .getAttribute("onclick")
          .match(/\d+/)[0]
      ),
      name: card.querySelector("h3").textContent,
      description: card.querySelector("p").textContent,
      status: card
        .querySelector('p[class^="status-"]')
        .textContent.replace("Status: ", ""),
    }))
    .find((p) => p.id === id);

  if (project) {
    document.getElementById("name").value = project.name;
    document.getElementById("description").value = project.description;
    document.getElementById("status").value = project.status;
    editingProjectId = id;
  }
}
