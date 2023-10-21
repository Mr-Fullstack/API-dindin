const { atualizarTransacao } = require("../../servicos/transacoes/atualizarTransacao");

async function atualizar(req, res) 
{
  const {error} = await atualizarTransacao({
    id:req.params.id,
    usuario_id: req.headers.usuario_id,
    ...req.body
  })
  if (error) return res.status(error.codigo).json({
    mensagem: error.mensagem,
  })
  return res.status(202).end();
}

module.exports = {
  atualizar
}