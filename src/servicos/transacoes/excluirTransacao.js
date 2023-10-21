const { bancoDeDados } = require("../../bancoDeDados");
const { capturarError } = require("../../utilitarios/servicos");
const { detalharTransacao } = require("./detalharTransacao");

async function excluirTransacao(dadosTransacao) 
{
  const { id, usuario_id } = dadosTransacao;
  try 
  {
    const { error } = await detalharTransacao(dadosTransacao);
    if (error) return { error };
    const exclusao = `DELETE FROM transacoes WHERE id=$1 AND usuario_id = $2`;
    const { rowCount } = await bancoDeDados.query(exclusao, [id, usuario_id]);
    if (rowCount === 1) return { dados: "Atualização da transação excluida com sucesso." };
  }
  catch (e) 
  {
    return capturarError(e)
  }
}

module.exports = {
  excluirTransacao
}