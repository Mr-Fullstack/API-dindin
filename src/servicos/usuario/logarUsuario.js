const bcrypt = require('bcrypt')
const { bancoDeDados } = require("../../bancoDeDados");
const { estaVazio, emailValido } = require("../../utilitarios/strings");
const { sign } = require('jsonwebtoken');
const { capturarError } = require('../../utilitarios/servicos');

async function logarUsuario(dadosUsuario)
{
  const { email, senha } = dadosUsuario;
  let senhaDoUsuario = senha;
  const respostaError = {
    error:{
      mensagem:"Usuário e/ou senha inválido(s).", 
      codigo: 400 
    }
  }
  if( estaVazio(senhaDoUsuario) || estaVazio(email) || !emailValido(email) ) return respostaError
  try
  {
    const insercao = `SELECT * FROM usuarios WHERE email = $1`
    const parametros = [email];
    const { rows,rowCount } = await bancoDeDados.query(insercao,parametros);
    if(rowCount < 1 ) return respostaError;
    const {senha, ...usuario } = rows[0];
    const senhaCorreta = await bcrypt.compare(senhaDoUsuario,senha);
    if(senhaCorreta)
    {
      const token = sign({ id:usuario.id },process.env.SENHA_SECRETA,{ expiresIn: "1h" });
      return { dados : { usuario, token } } ;
    }
  }
  catch(e)
  {
    return capturarError(e)
  }
}

module.exports = {
  logarUsuario
}
