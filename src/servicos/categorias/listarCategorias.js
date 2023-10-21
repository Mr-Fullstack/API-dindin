const { bancoDeDados } = require("../../bancoDeDados");
const { capturarError } = require('../../utilitarios/servicos');

async function listarCategorias() 
{
  try
  {
    const query = `SELECT * FROM categorias`;
    const { rows } = await bancoDeDados.query(query);
    return { dados: rows };
  }
  catch(e)
  {
    return capturarError(e);
  }
}

module.exports = {
  listarCategorias
}
