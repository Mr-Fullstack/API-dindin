const { bancoDeDados } = require("../../bancoDeDados");
const { capturarError } = require("../../utilitarios/servicos");

async function extratoTransacao(usuario_id) 
{
  try 
  {
    const obterEntradas = `SELECT SUM(valor) AS total FROM transacoes WHERE usuario_id = $1 AND tipo = 'entrada' ;`;
    const obterSaidas = `SELECT SUM(valor) AS total FROM transacoes WHERE usuario_id = $1 AND tipo = 'saida'`;
    const { rows:entradas } = await bancoDeDados.query(obterEntradas, [usuario_id]);
    const { rows:saidas } = await bancoDeDados.query(obterSaidas, [usuario_id]);
    return { 
      dados: {
        entradas:!entradas[0].total ? 0: Number(entradas[0].total),
        saidas:!saidas[0].total ? 0 : Number(saidas[0].total)
      } 
    }
  }
  catch (e) 
  {
    return capturarError(e)
  }
}

module.exports = {
  extratoTransacao
}