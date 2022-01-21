const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3001;
const cors = require('cors');
const mariadb = require('mariadb');

/**********************************************************/

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("../../../../dist/all-db/"));
app.use(cors({
    origin: '*'
}));

/**********************************************************/

const pool = mariadb.createPool({
     host: 'localhost',
     user:'root',
     password: 'mocha16!',
     database: 'alldb',
     connectionLimit: 5
});
pool.getConnection()
    .then(conn => {

      conn.query("SELECT 1 as val")
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          //Table must have been created before
          // " CREATE TABLE myTable (id int, val varchar(255)) "
          return conn.query("INSERT INTO mariadb_users value (?, ?, ?, ?)", [0, "Shaun", "shaun@gmail.com", "NYC"]);
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err);
          conn.end();
        })

    }).catch(err => {
      //not connected
    });
    async function asyncFunction() {
      let conn;
      try {
    	conn = await pool.getConnection();
    	const rows = await conn.query("SELECT 1 as val");
    	console.log(rows); //[ {val: 1}, meta: ... ]
    	const res = await conn.query("INSERT INTO mariadb_users value (?, ?, ?, ?)", [0, "Shaun", "shaun@gmail.com", "NYC"]);
    	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

      } catch (err) {
    	throw err;
      } finally {
    	if (conn) return conn.end();
      }
    }

/**********************************************************/

/**********************************************************/

app.get('/mariadb-users', (req, res) => {
  const sql = "SELECT * FROM mariadb_users;";
  pool.query(sql, function (error, results, fields) {
      console.log(results);
      res.send(results);
      res.end();
  });
});

app.delete('/mariadb-users/:id', (req, res) => {
  const sql = `DELETE FROM mariadb_users WHERE _id = ${req.params.id}`;
  pool.query(sql, function (error, results, fields) {
    console.log("Number of records deleted: " + results.affectedRows);
  });
});

app.post('/mariadb-users', (req, res) => {
  let user = req.body;
  console.log(this.user);

  sql = `INSERT INTO mariadb_users (_id, name, email, city) VALUES (${user._id},'${user.name}','${user.email}','${user.city}')`;
  pool.query(sql, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${results._id}`)
  })
});

app.get('/', (req, res) => {
  res.sendFile("../../../../dist/all-db/index.html")
});

/**********************************************************/

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
