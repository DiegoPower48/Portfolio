"use strict";

const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors.map((error) => error.message));
  }
};

module.exports = validateSchema;
