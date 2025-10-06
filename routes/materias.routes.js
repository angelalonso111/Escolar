import { Router } from "express";
import { getMaterias, createMateria, asignarMateriasAlumno } from "../controllers/materias.controller.js";

const router = Router();

router.get("/", getMaterias);
router.post("/", createMateria);
router.post("/", asignarMateriasAAlumno);

export default router;
