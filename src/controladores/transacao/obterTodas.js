const { filtrarTransacao } = require("../../servicos/transacoes/filtrarTransacao");
const { listarTransacao } = require("../../servicos/transacoes/listarTransacao");

async function obterTodas(req,res)
{
  let transacoes;

  if( req.query.filtro && req.query.filtro.length >=1 )
    transacoes =  await filtrarTransacao(req.query.filtro,req.headers.usuario_id)
  else 
  transacoes = await listarTransacao(req.headers.usuario_id)

  const { error, dados } = transacoes;
  if(error) return res.status(error.codigo).json({
      mensagem: error.mensagem
  })
  return res.status(200).json(dados);
}

module.exports = {
  obterTodas
}