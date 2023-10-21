const { bancoDeDados } = require("../../bancoDeDados");
const { capturarError } = require("../../utilitarios/servicos");
const bcrypt = require("bcrypt")

async function atualizarUsuario(dadosUsuario)
{
  const { nome, email, senha, id } = dadosUsuario;
  try 
  {
    const senhaEncriptada = await bcrypt.hash(`${senha}`, 10);
    const atualizar = `UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4`;
    const parametros = [nome, email, senhaEncriptada, id];
    await bancoDeDados.query(atualizar, parametros);
    return { dados: "Dados atualizados com sucesso" };
  }
  catch (e)
  {
    return capturarError(e);
  }
}

module.exports = {
  atualizarUsuario
}