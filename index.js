import express from "express";
import dotenv from "dotenv";
import alumnosRoutes from "./routes/alumnos.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Ruta de prueba
app.get("/ping", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Rutas de alumnos
app.use("/alumnos", alumnosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
