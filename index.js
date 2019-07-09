const express = require("express");

const server = express();

server.use(express.json());

server.listen(3000);

const projects = [];

var cont = 0;

function checkIdExists(req, res, next) {
  const { id } = req.body;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: `Id ${id} not found` });
  }
  return next();
}

server.use((req, res, next) => {
  cont++;
  console.log(`Numbers of Requests ${cont}`);

  return next();
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = { id, title, tasks: [] };

  projects.push(project);

  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = projects.findIndex(p => p.id === id);
  if (project !== -1) {
    projects.splice(project, 1);
  }

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(projects);
});
