const { bancoDeDados } = require("../../bancoDeDados");
const { capturarError } = require("../../utilitarios/servicos");

async function detalharTransacao(dadosTransacao) 
{
  const { usuario_id, id } = dadosTransacao;
  try 
  {
    const selecao = `SELECT t.id, t.tipo,t.descricao, t.valor, t.data,t.usuario_id, t.categoria_id, 
		c.descricao AS categoria_nome  
		FROM transacoes t INNER JOIN categorias c ON t.categoria_id = c.id WHERE t.usuario_id = $1 AND t.id = $2 `;
    const { rows, rowCount } = await bancoDeDados.query(selecao, [usuario_id, id]);
    if (rowCount < 1) return {
      error: {
        mensagem: "Transação não encontrada.",
        codigo: 404
      }
    };
    return { dados: rows[0] };
  }
  catch (e) 
  {
    return capturarError(e)
  }
}

module.exports = {
  detalharTransacao
}