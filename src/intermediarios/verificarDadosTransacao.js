const { estaVazio } = require("../utilitarios/strings");

function verificarDadosTransacao(req, res, next) 
{
  const { tipo, descricao, valor, data, categoria_id } = req.body;
  const validarDados = [tipo, descricao, valor, data, categoria_id];

  if (validarDados.some(dado => estaVazio(dado))) {
    return res.status(400).json({
      mensagem: "Todos os campos obrigatórios devem ser informados",
    })
  }
  
  if (isNaN(categoria_id)) return res.status(400).json({
    mensagem: "A categoria_id informada é inválida.",
  })

  const tiposDeTransacoes = [
    "entrada",
    "saida"
  ];

  if (isNaN(valor) || !isNaN(valor) && valor <= 0) return res.status(400).json({
    mensagem: "O valor informado é inválido.",
  })
  if (!tiposDeTransacoes.includes(tipo)) return res.status(400).json({
    mensagem: "O tipo informado é inválido.",
  })

  return next();
}

module.exports = {
  verificarDadosTransacao
}