const { bancoDeDados } = require("../../bancoDeDados");
const { capturarError } = require("../../utilitarios/servicos");

async function filtrarTransacao(filtros,usuario_id) 
{
  try 
  { 
    const construirFiltros = filtros
    .map( (filtro,index) => `c.descricao iLIKE '${filtro}' ${index >= filtros.length -1 ?'': 'OR'}`);
    const transacao = `SELECT * FROM transacoes t INNER JOIN categorias c ON t.categoria_id = c.id 
    WHERE t.usuario_id = $1 AND ${construirFiltros.join(" ")};`;
    const { rows:transacoes } = await bancoDeDados.query(transacao, [usuario_id]);
    return{ dados: transacoes };
  }
  catch (e) 
  {
    return capturarError(e)
  }
}

module.exports = {
  filtrarTransacao
}