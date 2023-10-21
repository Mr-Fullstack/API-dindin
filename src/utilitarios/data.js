function dataValida(data) 
{
  return new Date(data) instanceof Date;
}

module.exports = {
  dataValida
} 