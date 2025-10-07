import { Router } from "express";
import { asignarHorario, getHorariosPorAlumno } from "../controllers/horarios.controller.js";

const router = Router();

// POST → Asignar un nuevo horario
router.post("/", asignarHorario);

// GET → Obtener los horarios de un alumno
router.get("/alumno/:alumno", getHorariosPorAlumno);

export default router;
