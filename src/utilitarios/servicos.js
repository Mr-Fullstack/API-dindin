function capturarError(e)
{
  resposta = {
    error:{
      codigo: 400 
    }
  }
  switch(e.message)
  {
    case 'duplicate key value violates unique constraint "usuarios_email_key"':
      resposta.error = { mensagem : "O e-mail informado já está sendo utilizado por outro usuário.", codigo: 422 };
      break;
    case 'invalid token':
    case 'invalid signature':
      resposta.error = { mensagem : "token inválido.", codigo: 400 };
      break;
    case 'jwt expired':
      resposta.error = { mensagem : "token expirado.", codigo: 422 };
      break;
    default:
      resposta.error = { mensagem: "Erro interno do servidor.", codigo: 500}
      break; 
  }

  return resposta
}

module.exports = {
  capturarError
}