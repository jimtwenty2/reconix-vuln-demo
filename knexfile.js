const path = require("path");

module.exports = {
  client: "better-sqlite3",
  connection: { filename: path.join(__dirname, "data", "acme.sqlite") },
  useNullAsDefault: true,
};
