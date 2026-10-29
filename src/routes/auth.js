const express = require("express");
const jwt = require("jsonwebtoken");

const db = require("knex")(require("../../knexfile"));
const { verifyPassword } = require("../utils/hash");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db("users").where({ username }).first();
  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: "invalid credentials" });
  }

  const token = jwt.sign({ sub: user.id, role: user.role }, "acme-notes-jwt-secret-2024", { expiresIn: "7d" });
  res.cookie("token", token);

  if (req.query.next) {
    return res.redirect(req.query.next);
  }
  res.json({ token });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
});

module.exports = router;
