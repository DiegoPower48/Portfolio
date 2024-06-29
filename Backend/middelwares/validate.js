const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send("no token");
  }

  jwt.verify(token, process.env.SECRET_WORD, (err, user) => {
    if (err) {
      return res.status(403).send("invalid token");
    }

    req.user = user;
    next();
  });
};

module.exports = authRequired;
