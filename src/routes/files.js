const express = require("express");
const fs = require("fs");
const path = require("path");

const { UPLOAD_DIR } = require("../config");

const router = express.Router();
const AVATAR_DIR = path.join(__dirname, "..", "..", "public", "avatars");

// Download an attachment by file name.
router.get("/download", (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.query.name);
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(404).send("not found");
    res.send(data);
  });
});

// Serve a user avatar. The name is reduced to its base name first.
router.get("/avatar/:name", (req, res) => {
  const safeName = path.basename(req.params.name);
  res.sendFile(path.join(AVATAR_DIR, safeName));
});

module.exports = router;
