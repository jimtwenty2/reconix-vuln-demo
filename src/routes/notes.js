const express = require("express");

const db = require("knex")(require("../../knexfile"));

const router = express.Router();

router.get("/", async (req, res) => {
  const ownerId = Number(req.query.owner) || 0;
  const notes = await db("notes").select("id", "title", "body").where({ owner_id: ownerId });
  res.json(notes);
});

router.get("/:id", async (req, res) => {
  const note = await db("notes").where({ id: Number(req.params.id) }).first();
  if (!note) return res.status(404).json({ error: "not found" });
  res.json(note);
});

router.post("/", async (req, res) => {
  const { ownerId, title, body } = req.body;
  const [id] = await db("notes").insert({ owner_id: ownerId, title, body });
  res.status(201).json({ id });
});

module.exports = router;
