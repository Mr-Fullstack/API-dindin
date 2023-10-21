const { verify } = require("jsonwebtoken");
const { estaVazio } = require("../utilitarios/strings");
const { capturarError } = require("../utilitarios/servicos");

async function verificarAutenticacao(req, res, next) 
{
  const { authorization } = req.headers;
  if ( estaVazio(authorization) ) return res.status(400).json({ 
    mensagem: `Para acessar este recurso um token de autenticação válido deve ser enviado.`
  })
  try {
    const token = authorization.split(' ')[1];
    const tokenValido = verify(token, process.env.SENHA_SECRETA);
    req.headers.usuario_id = tokenValido.id;
    return next();
  } 
  catch (e) 
  {
    const { error } = capturarError(e);
    return res.status(error.codigo).json({mensagem: error.mensagem});
  }
}

module.exports = {
  verificarAutenticacao
}