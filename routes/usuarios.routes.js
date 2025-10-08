import { Router } from "express";
import { getUsuarios, createUsuarios, loginUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", getUsuarios);
router.post("/", createUsuarios);
router.post("/login", loginUsuario);

export default router;
