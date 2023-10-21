require('dotenv').config()
const express = require("express");
const usuario = require('./rotas/usuario.rotas')
const categoria = require("./rotas/categorias.rotas")
const transacao = require("./rotas/transacao.rotas");
const { extrato } = require('./controladores/transacao/extrato');
const app = express();
const port = 3000;
app.use(express.json());
app.use(usuario.rotas);
app.use(categoria.rotas)
app.use(transacao.rotas)
app.listen(port)