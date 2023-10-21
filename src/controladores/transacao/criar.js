const { criarTransacao } = require("../../servicos/transacoes/criarTransacao")

async function criar(req, res) 
{
  const {error, dados} = await criarTransacao({
    usuario_id: req.headers.usuario_id,
    ...req.body
  })
  if (error) return res.status(error.codigo).json({
    mensagem: error.mensagem,
  })
  return res.status(200).json(dados);
}

module.exports = {
  criar
}