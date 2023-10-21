const { excluirTransacao } = require("../../servicos/transacoes/excluirTransacao");

async function excluir(req, res) 
{
  const { usuario_id }= req.headers;
  const { id } = req.params;
  const { error } = await excluirTransacao({id,usuario_id})
  if (error) return res.status(error.codigo).json({
    mensagem: error.mensagem,
  })
  return res.status(200).end();
}

module.exports = {
  excluir
}