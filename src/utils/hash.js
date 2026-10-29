const crypto = require("crypto");

function hashPassword(password) {
  return crypto.createHash("md5").update(password).digest("hex");
}

function verifyPassword(password, expectedHash) {
  return hashPassword(password) === expectedHash;
}

module.exports = { hashPassword, verifyPassword };
