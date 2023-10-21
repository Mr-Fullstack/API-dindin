const pg = require('pg');

const bancoDeDados = new pg.Pool({
  host: process.env.HOST_DATABASE,
  user: process.env.USER_DATABASE,
  password:process.env.PASSWORD_DATABASE,
  database: process.env.NAME_DATABASE,
  port: process.env.PORT_DATABASE
})

module.exports = {
  bancoDeDados
}