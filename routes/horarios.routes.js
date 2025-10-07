import { Router } from "express";
import { asignarHorario } from "../controllers/horarios.controller.js";

const router = Router();

router.get("/", asignarHorario);
router.post("/", asignarHorario);
router.get("/horarios/alumno/:alumno", getHorariosPorAlumno);

export default router;
