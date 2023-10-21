const { estaVazio, emailValido } = require("../utilitarios/strings");

function verificarDadosUsuarios(req, res, next) 
{
  const { nome, email, senha } = req.body;
  
  if(estaVazio(nome)) return res.status(400).json({ 
    mensagem:"Campo nome é obrigatório.", 
  }) 
  
  if(estaVazio(senha)) return res.status(400).json({ 
    mensagem:"Campo senha é obrigatório.", 
  }) 

  if(estaVazio(email)) return res.status(400).json({ 
    mensagem:"Campo email é obrigatório.", 
  }) 
  
  if(!emailValido(email)) return res.status(400).json({ 
    mensagem:"Email inválido.", 
  })

  return next();
}

module.exports = {
  verificarDadosUsuarios
}