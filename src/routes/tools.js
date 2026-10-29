const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

// Admin helper: check that a host is reachable.
router.post("/ping", (req, res) => {
  const host = req.body.host;
  exec("ping -c 1 " + host, (err, stdout) => {
    if (err) return res.status(500).json({ error: "ping failed" });
    res.type("text/plain").send(stdout);
  });
});

// Quick calculator used by the notes editor ("=2+2").
router.post("/calc", (req, res) => {
  const result = eval(req.body.expression);
  res.json({ result });
});

module.exports = router;
