"use strict";

const { z } = require("zod");

const registerSchema = z.object({
  nombre: z.string({ require_error: "nombre is required" }),
  contraseña: z
    .string({ required_error: "contraseña is required" })
    .min(6, { message: "contraseña must be at least 6 characters" }),
  correo: z
    .string({ required_error: "correo is required" })
    .email({ message: "Invalid email" }),
});

const loginSchema = z.object({
  nombre: z.string({
    required_error: "nombre is required",
  }),
  contraseña: z
    .string({ required_error: "contraseña is required" })
    .min(6, { message: "contraseña must be at least 6 characters" }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
