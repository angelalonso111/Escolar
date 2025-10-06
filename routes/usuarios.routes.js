import { Router } from "express";
import { getUsuarios, createUsuarios } from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", getUsuarios);
router.post("/", createUsuarios);

export default router;
