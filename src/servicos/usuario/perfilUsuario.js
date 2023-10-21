
const { bancoDeDados } = require("../../bancoDeDados");
const { estaVazio } = require("../../utilitarios/strings");
const { capturarError } = require('../../utilitarios/servicos');
const { verify} = require('jsonwebtoken');

async function perfilUsuario(dadosUsuario) 
{
  const { id } = dadosUsuario;
  try
  {
    const insercao = `SELECT * FROM usuarios WHERE id = $1`;
    const parametros = [id];
    const { rows,rowCount } = await bancoDeDados.query(insercao,parametros);
    if(rowCount < 1 ) return {
      error:{
        mensagem:"Usuário não encontrado",
        codigo:404
      }
    };
    const {senha, ...usuario } = rows[0];
    return { dados:usuario };
  }
  catch(e)
  {
    return capturarError(e);
  }
}

module.exports = {
  perfilUsuario
}
