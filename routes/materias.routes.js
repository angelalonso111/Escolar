import { Router } from "express";
import { getMaterias, createMateria, asignarMateriasAAlumno, getAsignacionesPorAlumno } from "../controllers/materias.controller.js";


const router = Router();

router.get("/", getMaterias);
router.post("/", createMateria);
router.post("/asignar", asignarMateriasAAlumno);
router.get("/asignaciones/:alumno", getAsignacionesPorAlumno);
export default router;


