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
  try {
    const materias = Array.isArray(req.body) ? req.body : [req.body]; // ✅ aceptar 1 o varias

    // Validar que todas tengan los campos requeridos
    for (const materia of materias) {
      const { nombre, carrera, grado } = materia;
      if (!nombre || !carrera || !grado) {
        return res.status(400).json({
          ok: false,
          error: "Faltan campos: nombre carrera y grado son requeridos",
        });
      }
    }

    // Insertar todas las materias
    const resultados = [];
    for (const materia of materias) {
      const { nombre, carrera, grado } = materia;

      const [result] = await pool.query(
        "INSERT INTO materias (nombre, carrera, grado) VALUES (?, ?, ?)",
        [nombre, carrera, grado]
      );

      resultados.push({
        id: result.insertId,
        nombre,
        carrera,
        grado,
      });
    }

    return res.json({
      ok: true,
      mensaje:
        materias.length > 1
          ? `✅ ${materias.length} materias agregadas correctamente`
          : "✅ Materia agregada correctamente",
      materias: resultados,
    });
  } catch (err) {
    console.error("❌ Error insertando materia:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

export const asignarMateriasAAlumno = async (req, res) => {
  try {
    const { alumno_id, materias } = req.body;

    if (!alumno_id || !Array.isArray(materias) || materias.length === 0) {
      return res.status(400).json({
        ok: false,
        error: "Faltan campos: alumno_id y materias son requeridos",
      });
    }

    const resultados = [];

    for (const idMateria of materias) {
      const [result] = await pool.query(
        "INSERT INTO asignacionMaterias (alumno, materia, estatus) VALUES (?, ?, ?)",
        [alumno_id, idMateria, "Activo"]
      );

      resultados.push({
        id: result.insertId,
        alumno: alumno_id,
        materia: idMateria,
        estatus: "Activo",
      });
    }

    return res.json({
      ok: true,
      mensaje: `✅ ${materias.length} materia(s) asignadas correctamente al alumno ${alumno_id}`,
      asignaciones: resultados,
    });
  } catch (err) {
    console.error("❌ Error al asignar materias:", err);
    return res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
};


