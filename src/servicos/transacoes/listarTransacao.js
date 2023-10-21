const { bancoDeDados } = require("../../bancoDeDados");
const { capturarError } = require("../../utilitarios/servicos");

async function listarTransacao(usuario_id) 
{
  try 
  {
    const selecao = `SELECT t.id, t.tipo,t.descricao, t.valor, t.data,t.usuario_id, t.categoria_id, 
		c.descricao AS categoria_nome  
		FROM transacoes t INNER JOIN categorias c ON t.categoria_id = c.id	WHERE usuario_id = $1 `;
    const { rows } = await bancoDeDados.query(selecao, [usuario_id]);
    return { dados: rows };
  }
  catch (e) 
  {
    return capturarError(e)
  }
}

module.exports = {
  listarTransacao
}