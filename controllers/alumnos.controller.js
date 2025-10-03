import { pool } from "../config/db.js";

export const getAlumnos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM alumnos");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener alumnos:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};

export const createAlumno = async (req, res) => {
  const { nombre, correo } = req.body;

  if (!nombre || !correo) {
    return res.status(400).json({ ok: false, error: "Faltan campos: nombre y correo son requeridos" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO alumnos (nombre, correo) VALUES (?, ?)",
      [nombre, correo]
    );
    res.json({ ok: true, id: result.insertId, mensaje: "Alumno agregado correctamente" });
  } catch (err) {
    console.error("❌ Error insertando alumno:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};




export const getMaterias = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM materias");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener las materias:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};

export const createMaterias = async (req, res) => {
  const { nombre, correo } = req.body;

  if (!nombre || !correo) {
    return res.status(400).json({ ok: false, error: "Faltan campos: Nombre, carrera y grado son requeridos" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO materias (nombre, carrera, grado) VALUES (?, ?, ?)",
      [nombre, correo]
    );
    res.json({ ok: true, id: result.insertId, mensaje: "Materia agregada correctamente" });
  } catch (err) {
    console.error("❌ Error insertando Materias:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};

