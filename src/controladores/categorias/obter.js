const { listarCategorias } = require("../../servicos/categorias/listarCategorias");

async function obter (req,res)
{
  const { error,dados } = await listarCategorias();
  if(error) return res.status(error.codigo).json({
      mensagem: error.mensagem
  })
  return res.status(200).json(dados);
}

module.exports = {
  obter
}