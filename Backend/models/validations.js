"use strict";

const { z } = require("zod");

const registerSchema = z.object({
  nombre: z.string({ require_error: "Debes ingresar un nombre de usuario" }),
  contrasenia: z
    .string({ required_error: "Debes ingresar una contraseña" })
    .min(6, { message: "La contraseña debe tener almenos 6 caracteres" }),
  correo: z
    .string({ required_error: "Debes ingresar un correo" })
    .email({ message: "Correo no valido" }),
});

const loginSchema = z.object({
  nombre: z.string({
    required_error: "Debes ingresar un nombre",
  }),
  contrasenia: z.string({ required_error: "Contraseña incorrecta" }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
