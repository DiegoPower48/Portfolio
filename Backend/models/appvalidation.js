"use strict";

const { z } = require("zod");

const registerSchema = z.object({
  correo: z
    .string()
    .refine((correo) => correo.startsWith("u") || correo.startsWith("U"), {
      message: "El correo ingresado no es un correo institucional",
    })
    .refine((correo) => correo.endsWith("@utp.edu.pe"), {
      message: "El correo ingresado no es un correo institucional",
    }),
});

module.exports = {
  registerSchema,
};
