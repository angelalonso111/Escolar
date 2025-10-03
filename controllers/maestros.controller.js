import { pool } from "../config/db.js";

// 🔹 Obtener todos los maestros
export const getMaestros = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM maestros");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener maestros:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};

// 🔹 Agregar maestro nuevo
export const createMaestro = async (req, res) => {
  const { nombre, carrera, grado } = req.body;

  if (!nombre || !carrera || !grado) {
    return res.status(400).json({ ok: false, error: "Faltan campos: nombre carrera y grado son requeridos" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO materias (nombre, carrera, grado) VALUES (?, ?, ?)",
      [nombre, carrera, grado]
    );
    res.json({ ok: true, id: result.insertId, mensaje: "Materia agregada correctamente" });
  } catch (err) {
    console.error("❌ Error insertando materia:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};
