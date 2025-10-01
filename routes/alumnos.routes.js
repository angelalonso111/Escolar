import { Router } from "express";
import { getAlumnos, createAlumno } from "../controllers/alumnos.controller.js";

const router = Router();

router.get("/", getAlumnos);
router.post("/", createAlumno);

export default router;
