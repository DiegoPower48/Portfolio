"use strict";

const { z } = require("zod");

const registerSchema = z.object({
  contraseña: z
    .string({ required_error: "Debes ingresar una contraseña" })
    .min(6, { message: "La contraseña debe tener almenos 6 caracteres" }),
  correo: z
    .string({ required_error: "Debes ingresar un correo" })
    .email({ message: "Correo no valido" }),
});

const loginSchema = z.object({
  correo: z
    .string({ required_error: "Debes ingresar un correo" })
    .email({ message: "Correo no valido" }),
  contraseña: z.string({ required_error: "Contraseña incorrecta" }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
