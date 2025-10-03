import { Router } from "express";
import { getAlumnos, createAlumno, getMaterias, createMaterias } from "../controllers/alumnos.controller.js";

const router = Router();

router.get("/", getAlumnos);
router.post("/", createAlumno);

router.get("/", getMaterias);
router.post("/", createMaterias);

export default router;
