const express = require("express");
const { verificarAutenticacao } = require("../intermediarios/verificarAutenticacao");
const { verificarDadosTransacao } = require("../intermediarios/verificarDadosTransacao");
const { criar } = require("../controladores/transacao/criar");
const { atualizar } = require("../controladores/transacao/atualizar");
const { verificarIdTransacao } = require("../intermediarios/verificarIdTransacao");
const { obterUma } = require("../controladores/transacao/obterUma");
const { obterTodas } = require("../controladores/transacao/obterTodas");
const { excluir } = require("../controladores/transacao/excluir");
const { extrato } = require("../controladores/transacao/extrato");

const rotas = express.Router();

rotas.use(verificarAutenticacao);
rotas.post('/transacao',verificarDadosTransacao,criar);
rotas.get('/transacao',obterTodas);
rotas.get('/transacao/extrato/',extrato);
rotas.get('/transacao/:id',verificarIdTransacao,obterUma);
rotas.put('/transacao/:id',verificarDadosTransacao,verificarIdTransacao,atualizar);
rotas.delete('/transacao/:id',verificarIdTransacao,excluir);

module.exports = {
  rotas
}
