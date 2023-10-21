const { perfilUsuario } = require("../../servicos/usuario/perfilUsuario");

async function obter (req,res)
{
  const { usuario_id } = req.headers;
  const { error, dados } = await perfilUsuario({id: usuario_id});
  if(error) return res.status(error.codigo).json({
      mensagem: error.mensagem
  });
  return res.status(200).json(dados);
}

module.exports = {
  obter
}