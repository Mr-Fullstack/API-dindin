const { detalharTransacao } = require("../../servicos/transacoes/detalharTransacao");
const { listarTransacao } = require("../../servicos/transacoes/listarTransacao");

async function obterUma (req,res)
{
  const { usuario_id }= req.headers;
  const { id } = req.params;
  const { error, dados } = await detalharTransacao({id,usuario_id});
  if(error) return res.status(error.codigo).json({
      mensagem: error.mensagem
  })
  return res.status(200).json(dados);
}

module.exports = {
  obterUma
}