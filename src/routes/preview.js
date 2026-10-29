const express = require("express");
const axios = require("axios");

const router = express.Router();

// Fetch a link preview (title) for URLs pasted into notes.
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(req.query.url, { timeout: 5000 });
    const match = /<title>([^<]*)<\/title>/i.exec(response.data);
    res.json({ title: match ? match[1] : null });
  } catch (err) {
    res.status(502).json({ error: "could not fetch preview" });
  }
});

module.exports = router;
