require("dotenv").config();
const express = require("express");
const app = express();

const pool = require("./db/postgres");

const playerRoutes = require("./routes/player.routes");
const accountRoutes = require("./routes/account.routes");

app.use(express.json());
app.use("/players", playerRoutes);
app.use("/accounts", accountRoutes);

app.get("/ping", (req, res) => {
  res.send("pong");
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
