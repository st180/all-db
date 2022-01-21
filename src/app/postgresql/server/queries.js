const Pool = require('pg').Pool
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'postgres',
  password: 'mocha16!',
  port: 8081,
})
