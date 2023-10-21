const { logarUsuario } = require("../../servicos/usuario/logarUsuario")

async function logar(req,res)
{
  const {error, dados} = await logarUsuario(req.body);
  if(error) return res.status(error.codigo).json({
      mensagem: error.mensagem
  })
  return res.status(200).json(dados);
}

module.exports = {
  logar
}