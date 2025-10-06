import { pool } from "../config/db.js";

// 🔹 Obtener todos los maestros
export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener usuarios:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};

// 🔹 Agregar maestro nuevo
export const createUsuarios = async (req, res) => {
  const { nombre, nickname, pass } = req.body;

  if (!nombre || !nickname || !pass ) {
    return res.status(400).json({ ok: false, error: "Faltan campos requeridos" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, nickname, pass) VALUES (?, ?, ? )",
      [nombre, nickname, pass]
    );
    res.json({ ok: true, id: result.insertId, mensaje: "Usuario agregado correctamente" });
  } catch (err) {
    console.error("❌ Error agregando usuario:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};
