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
export const createMaestros = async (req, res) => {
  const { nombre, edad, sexo, estatus, materiaAsignada } = req.body;

  if (!nombre || !edad || !sexo || !estatus ) {
    return res.status(400).json({ ok: false, error: "Faltan campos requeridos" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO maestros (nombre, edad, sexo,estatus,materiaAsignada) VALUES (?, ?, ?, ? ,?, ? )",
      [nombre, edad, sexo, estatus, materiaAsignada]
    );
    res.json({ ok: true, id: result.insertId, mensaje: "Maestro agregado correctamente" });
  } catch (err) {
    console.error("❌ Error insertando materia:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};
