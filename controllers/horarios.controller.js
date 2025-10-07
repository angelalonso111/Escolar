import { pool } from "../config/db.js";


export const asignarHorario = async (req, res) => {
  try {
    const { id_asignacion, dia_semana, hora_inicio, hora_fin, salon } = req.body;

    if (!id_asignacion || !dia_semana || !hora_inicio || !hora_fin) {
      return res.status(400).json({ ok: false, error: "Faltan campos obligatorios" });
    }

    // 1️⃣ Obtener alumno asociado
    const [asignacion] = await pool.query(
      "SELECT alumno FROM AsignacionMaterias WHERE id = ?",
      [id_asignacion]
    );
    if (asignacion.length === 0) throw new Error("Asignación no encontrada");

    const alumno = asignacion[0].alumno;

// 2️⃣ Verificar conflictos
const [conflictos] = await pool.query(
  `
  SELECT COUNT(*) AS conflictos
  FROM HorariosAsignacion ha
  JOIN AsignacionMaterias am ON ha.id_asignacion = am.id
  WHERE am.alumno = ?
    AND ha.dia_semana = ?
    AND (ha.hora_inicio < ? AND ha.hora_fin > ?)
  `,
  [alumno, dia_semana, hora_fin, hora_inicio]
);


    if (conflictos[0].conflictos > 0) {
      return res.status(400).json({
        ok: false,
        error: "❌ Conflicto de horario: el alumno ya tiene una materia en ese rango",
      });
    }

    // 3️⃣ Insertar si no hay conflicto
    const [result] = await pool.query(
      `INSERT INTO HorariosAsignacion (id_asignacion, dia_semana, hora_inicio, hora_fin, salon)
       VALUES (?, ?, ?, ?, ?)`,
      [id_asignacion, dia_semana, hora_inicio, hora_fin, salon]
    );

    return res.json({
      ok: true,
      mensaje: "✅ Horario asignado correctamente",
      id: result.insertId,
    });
  } catch (err) {
    console.error("❌ Error al asignar horario:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};
