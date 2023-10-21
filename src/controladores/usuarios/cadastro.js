const { criarUsuario } = require("../../servicos/usuario/criarUsuario")

async function cadastro (req,res) 
{
  const { error, dados } = await criarUsuario(req.body);
  if(error) return res.status(error.codigo).json({ 
      mensagem: error.mensagem
  })
  return res.status(200).json(dados);
}

module.exports = {
  cadastro
}