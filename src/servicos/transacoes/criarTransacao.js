const { bancoDeDados } = require("../../bancoDeDados");
const { capturarError } = require("../../utilitarios/servicos");

async function criarTransacao(dadosTransacao) 
{
  const { usuario_id, tipo, descricao, valor, data, categoria_id } = dadosTransacao;
  try 
  {
    let dataFormatada = new Date(data);
    if (dataFormatada.getMilliseconds() == 0) dataFormatada = new Date();

    const { rowCount, rows: categoria } = await bancoDeDados.query(`SELECT * FROM categorias WHERE id = $1`, [categoria_id])
    if (rowCount < 1) return {
      error: {
        mensagem: "Categoria não encontrada.",
        codigo: 404
      }
    }

    const insercao = `INSERT INTO transacoes(usuario_id,tipo,descricao,valor,data,categoria_id) 
		VALUES($1,$2,$3,$4,$5,$6) RETURNING*`;
    const parametros = [usuario_id, tipo, descricao, valor, dataFormatada.toISOString(), categoria_id];
    const { rows } = await bancoDeDados.query(insercao, parametros);

    return {
      dados: {
        ...rows[0],
        categoria_nome: categoria[0].descricao
      }
    };
  }
  catch (e) 
  {
    return capturarError(e)
  }
}

module.exports = {
  criarTransacao
}