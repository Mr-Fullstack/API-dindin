function verificarIdTransacao(req, res, next) 
{
  const { id } = req.params;
	if(isNaN(id)) return res.status(400).json({
		mensagem:'Parâmetro id da transação é inválido.',
	})
  return next();
}

module.exports = {
  verificarIdTransacao
}