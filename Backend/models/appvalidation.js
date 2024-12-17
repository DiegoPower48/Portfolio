"use strict";

const { z } = require("zod");

const registerSchema = z.object({
  correo: z.string().refine((correo) => correo.endsWith("@utp.edu.pe"), {
    message: "El correo ingresado no es un correo institucional",
  }),
});

module.exports = {
  registerSchema,
};
