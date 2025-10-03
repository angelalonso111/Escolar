import express from "express";
import dotenv from "dotenv";
import alumnosRoutes from "./routes/alumnos.routes.js";
import materiasRoutes from "./routes/materias.routes.js";
import maestrosRoutes from "./routes/maestros.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Ruta de prueba
app.get("/ping", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Rutas principales
app.use("/alumnos", alumnosRoutes);
app.use("/materias", materiasRoutes);
app.use("/maestros", maestrosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
