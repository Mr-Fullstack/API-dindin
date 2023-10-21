function estaVazio(valor) 
{
  if(typeof valor === 'string')
  {
    return valor.length >= 0 && ( valor
    .replace(' ',"-")
    .trim()
    .replace("-"," ") === ' '  |  valor
    .replace(' ',"-")
    .trim()
    .replace("-","") === '' )
  }
  else if(valor === undefined || valor === null ) return true
  else return false
}

function emailValido(email)
{
  return new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)
}

module.exports = {
  estaVazio,
  emailValido
}