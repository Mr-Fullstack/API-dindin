const express = require("express");
const { cadastro } = require("../controladores/usuarios/cadastro");
const { logar } = require("../controladores/usuarios/logar");
const { obter } = require("../controladores/usuarios/obter");
const { verificarAutenticacao } = require("../intermediarios/verificarAutenticacao");
const { verificarDadosUsuarios } = require("../intermediarios/verificarDadosUsuario");
const { atualizar } = require("../controladores/usuarios/atualizar");

const rotas = express.Router();

rotas.post('/usuario',verificarDadosUsuarios,cadastro);
rotas.post('/login',logar);
rotas.use(verificarAutenticacao);
rotas.get('/usuario',obter);
rotas.put("/usuario",verificarDadosUsuarios, atualizar);

module.exports = {
  rotas
}
