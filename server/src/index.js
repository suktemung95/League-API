require("dotenv").config();
const express = require("express");
const app = express();

const pool = require("./db/postgres");

const playerRoutes = require("./routes/player.routes");
const accountRoutes = require("./routes/account.routes");
const matchRoutes = require("./routes/match.routes");
const healthRoutes = require("./routes/health.routes");

app.use(express.json());
app.use("/players", playerRoutes);
app.use("/accounts", accountRoutes);
app.use("/matches", matchRoutes);
app.use("/health", healthRoutes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong", status: "ok" });
});

app.get("/debug-db", async (req, res) => {
  const result = await pool.query(`
SELECT table_schema, table_name
FROM information_schema.tables
ORDER BY table_schema, table_name
`);

  res.send(result.rows);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
