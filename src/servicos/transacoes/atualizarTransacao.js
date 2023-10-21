const { bancoDeDados } = require("../../bancoDeDados");
const { capturarError } = require("../../utilitarios/servicos");

async function atualizarTransacao(dadosTransacao) 
{
  const { id, usuario_id, tipo, descricao, valor, data, categoria_id } = dadosTransacao;
  try 
  {
    let dataFormatada = new Date(data);
    if (dataFormatada.getMilliseconds() == 0) dataFormatada = new Date();

    const { rowCount: categorias } = await bancoDeDados.query(`SELECT * FROM categorias WHERE id = $1`, [categoria_id])
    if (categorias < 1) return {
      error: {
        mensagem: "Categoria não encontrada.",
        codigo: 404
      }
    }
    const atualizacao = `UPDATE transacoes SET tipo=$1, descricao=$2,  valor=$3, data=$4,  categoria_id=$5 
		WHERE id=$6 AND usuario_id = $7 `;
    const parametros = [tipo, descricao, valor, dataFormatada.toISOString(), categoria_id, id, usuario_id];
    const { rowCount } = await bancoDeDados.query(atualizacao, parametros);
    if (rowCount === 1) return { dados: "Atualização da transação concluida com sucesso." };
  }
  catch (e) 
  {
    return capturarError(e)
  }
}

module.exports = {
  atualizarTransacao
}