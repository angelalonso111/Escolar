import { Router } from "express";
import { asignarHorario, getHorariosPorAlumnos } from "../controllers/horarios.controller.js";

const router = Router();

router.get("/", asignarHorario);
router.post("/", asignarHorario);
router.get("/alumno/:alumno", getHorariosPorAlumno);

export default router;
