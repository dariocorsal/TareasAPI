const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let tareas = [];
let idCounter = 1;

app.post("/tareas", (req, res) => {
  const { titulo, descripcion } = req.body;
  if (!titulo) {
    return res.json({ error: "Título obligatorio" });
  }

  const tarea = { id: idCounter++, titulo, descripcion };
  tareas.push(tarea);
  res.json(tarea);
});

app.get("/", (req, res) => {
  res.json(tareas);
});

app.get("/tareas/:id", (req, res) => {
  const tarea = tareas.find((t) => t.id === parseInt(req.params.id));
  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.json(tarea);
});

app.put("/tareas/:id", (req, res) => {
  const tarea = tareas.find((t) => t.id === parseInt(req.params.id));
  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  const { titulo, descripcion } = req.body;
  if (titulo) tarea.titulo = titulo;
  if (descripcion) tarea.descripcion = descripcion;

  res.json({ message: "Tarea actualizada", tarea });
});

app.delete("/tareas/:id", (req, res) => {
  const tareaId = parseInt(req.params.id);
  const index = tareas.findIndex((t) => t.id === tareaId);

  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  tareas.splice(index, 1);
  res.json({ message: "Tarea eliminada" });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor corriendo en 0.0.0.0:3000");
});
