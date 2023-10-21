const bcrypt = require('bcrypt')
const { bancoDeDados } = require("../../bancoDeDados");
const { estaVazio, emailValido } = require("../../utilitarios/strings");
const { capturarError } = require('../../utilitarios/servicos');

async function criarUsuario(dadosUsuario) 
{
  const { nome, email, senha } = dadosUsuario;
  try
  {
    const senhaEncriptada = await bcrypt.hash(`${senha}`,10);
    const insercao = `INSERT INTO usuarios(nome,email,senha) VALUES($1,$2,$3) RETURNING*`;
    const parametros = [nome,email,senhaEncriptada];
    const { rows } = await bancoDeDados.query(insercao,parametros);
    const {senha:senhaDoUsuario, ...usuario } = rows[0];
    return { dados: usuario };
  }
  catch(e)
  {
    return capturarError(e);
  }
}

module.exports = {
  criarUsuario
}
