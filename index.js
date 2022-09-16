const express = require("express");
const app = express();

// Usar o EJS como engine...

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("App Rodando...");
});
