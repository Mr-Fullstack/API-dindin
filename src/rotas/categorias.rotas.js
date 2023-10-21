const express = require("express");
const { verificarAutenticacao } = require("../intermediarios/verificarAutenticacao");
const { obter } = require("../controladores/categorias/obter");
const rotas = express.Router();

rotas.use(verificarAutenticacao);
rotas.get('/categoria', obter);

module.exports = {
  rotas
}
