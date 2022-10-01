const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./data/database");
const Pergunta = require("./data/Pergunta");

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });
// Usar o EJS como engine...

app.set("view engine", "ejs");
app.use(express.static("public"));

// Body Parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas

app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      res.render("pergunta"); // Pergunta encontrada
    } else {
      res.redirect("/"); // Não encontrada
    }
  });
});

app.listen(8080, () => {
  console.log("App Rodando...");
});
