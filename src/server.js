const express = require("express");
const path = require("path");

const { PORT } = require("./config");
const { ready } = require("./db");
const { loadSession } = require("./middleware/session");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const noteRoutes = require("./routes/notes");
const fileRoutes = require("./routes/files");
const toolRoutes = require("./routes/tools");
const previewRoutes = require("./routes/preview");
const pageRoutes = require("./routes/pages");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(loadSession);

app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/tools", toolRoutes);
app.use("/api/preview", previewRoutes);
app.use("/", pageRoutes);

ready.then(() => app.listen(PORT, () => {
  console.log(`Acme Notes listening on http://localhost:${PORT}`);
}));
