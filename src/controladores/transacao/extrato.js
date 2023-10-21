const { extratoTransacao } = require("../../servicos/transacoes/extratoTransacao");

async function extrato(req,res)
{
  const { error, dados } = await extratoTransacao(req.headers.usuario_id);
  if(error) return res.status(error.codigo).json({
      mensagem: error.mensagem
  })
  return res.status(200).json(dados);
}

module.exports = {
  extrato
}