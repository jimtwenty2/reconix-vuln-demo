const express = require("express");
const _ = require("lodash");

const db = require("knex")(require("../../knexfile"));

const router = express.Router();

// Search users by name for the "share note" dialog.
router.get("/search", async (req, res) => {
  const name = req.query.name || "";
  const rows = await db.raw("SELECT id, username, email FROM users WHERE username LIKE '%" + name + "%'");
  res.json(rows);
});

router.get("/:id", async (req, res) => {
  const user = await db("users").select("id", "username", "email", "role").where({ id: Number(req.params.id) }).first();
  if (!user) return res.status(404).json({ error: "not found" });
  res.json(user);
});

// Update profile settings; the client sends a partial object.
router.patch("/:id/settings", (req, res) => {
  const settings = { theme: "light", notifications: true };
  _.merge(settings, req.body);
  res.json(settings);
});

module.exports = router;
