const { atualizarUsuario } = require("../../servicos/usuario/atualizarUsuario")

async function atualizar(req, res) 
{
   const { usuario_id } = req.headers;
   const { nome, email, senha } = req.body;
   const { error } = await atualizarUsuario({ id: usuario_id, nome, email, senha });
   if (error) return res.status(error.codigo).json({
     mensagem: error.mensagem
   })
   return res.status(202).end();
}

module.exports = {
    atualizar
}