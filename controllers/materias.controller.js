import { pool } from "../config/db.js";

// 🔹 Obtener todas las materias
export const getMaterias = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM materias");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener materias:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};

// 🔹 Agregar una nueva materia
export const createMateria = async (req, res) => {
  const { nombre, carrera, grado } = req.body;

  if (!nombre || !clave) {
    return res.status(400).json({ ok: false, error: "Faltan campos: nombre carrera y grado son requeridos" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO materias (nombre, carrera, grado) VALUES (?, ?, ?)",
      [nombre, clave]
    );
    res.json({ ok: true, id: result.insertId, mensaje: "Materia agregada correctamente" });
  } catch (err) {
    console.error("❌ Error insertando materia:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};
