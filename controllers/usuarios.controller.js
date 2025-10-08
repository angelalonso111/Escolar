import { pool } from "../config/db.js";

// 🔹 Obtener todos los maestros
export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener usuarios:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};

// 🔹 Agregar maestro nuevo
export const createUsuarios = async (req, res) => {
  const { nombre, nickname, pass } = req.body;

  if (!nombre || !nickname || !pass ) {
    return res.status(400).json({ ok: false, error: "Faltan campos requeridos" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, nickname, pass) VALUES (?, ?, ? )",
      [nombre, nickname, pass]
    );
    res.json({ ok: true, id: result.insertId, mensaje: "Usuario agregado correctamente" });
  } catch (err) {
    console.error("❌ Error agregando usuario:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};

// 🔹 Login de usuario con validación de rol
export const loginUsuario = async (req, res) => {
  const { nickname, pass } = req.body;

  if (!nickname || !pass) {
    return res.status(400).json({ ok: false, error: "Faltan campos requeridos" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE nickname = ?", [nickname]);

    if (rows.length === 0) {
      return res.status(401).json({ ok: false, error: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    // En producción deberías usar bcrypt para comparar contraseñas
    if (usuario.pass !== pass) {
      return res.status(401).json({ ok: false, error: "Contraseña incorrecta" });
    }

    // Determinar el rol
    let rolNombre = "";
    switch (usuario.rol) {
      case 1:
        rolNombre = "Alumno";
        break;
      case 2:
        rolNombre = "Maestro";
        break;
      case 3:
        rolNombre = "Administrador";
        break;
      default:
        rolNombre = "Desconocido";
    }

    res.json({
      ok: true,
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        nickname: usuario.nickname,
        rol: usuario.rol,
        rolNombre,
      },
    });
  } catch (err) {
    console.error("❌ Error al iniciar sesión:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
};


