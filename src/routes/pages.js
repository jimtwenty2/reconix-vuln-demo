const express = require("express");

const router = express.Router();

router.get("/welcome", (req, res) => {
  const name = req.query.name || "guest";
  res.send("<h1>Welcome back, " + name + "!</h1><p>Your notes are waiting.</p>");
});

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
