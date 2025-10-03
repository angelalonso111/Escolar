import { Router } from "express";
import { getMaestros, createMaestros } from "../controllers/maestros.controller.js";

const router = Router();

router.get("/", getMaestros);
router.post("/", createMaestros);

export default router;
