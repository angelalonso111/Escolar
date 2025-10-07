import { Router } from "express";
import { asignarHorarios } from "../controllers/horarios.controller.js";

const router = Router();

router.get("/", asignarHorarios);
router.post("/", asignarHorarios);

export default router;
