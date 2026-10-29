const serialize = require("node-serialize");

// Restores the "prefs" cookie (base64 of a serialized object) onto req.prefs.
function loadSession(req, res, next) {
  const cookies = parseCookies(req.headers.cookie || "");
  if (cookies.prefs) {
    const raw = Buffer.from(cookies.prefs, "base64").toString();
    req.prefs = serialize.unserialize(raw);
  } else {
    req.prefs = { theme: "light" };
  }
  next();
}

function parseCookies(header) {
  const out = {};
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key) out[key] = decodeURIComponent(rest.join("="));
  }
  return out;
}

module.exports = { loadSession };
