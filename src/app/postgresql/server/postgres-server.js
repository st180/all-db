const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 8081;
const cors = require('cors');

/**********************************************************/

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("../../../../dist/all-db/"));
app.use(cors({
    origin: '*'
}));

/**********************************************************/

const { Pool, Client } = require("pg");
const credentials = {
  user: "shaunteeshad",
  host: "localhost",
  database: "postgres",
  password: "mocha16!",
  port: 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0
};
const pool = new Pool(credentials);

/**********************************************************/

/**********************************************************/

app.get('/postgres-users', (req, res) => {
  const sql = "SELECT * FROM postgres_users;";
  pool.query(sql, function (error, results, fields) {
      return res.send(results.rows);
  });
});

app.delete('/postgres-users/:id', (req, res) => {
  const sql = `DELETE FROM postgres_users WHERE _id = ${req.params.id}`;
  pool.query(sql, function (error, results, fields) {
    console.log("Number of records deleted: " + results.affectedRows);
  });
});

app.post('/postgres-users', (req, res) => {
  let user = req.body;
  console.log(this.user);

  sql = `INSERT INTO postgres_users (_id, name, email, city) VALUES (${user._id},'${user.name}','${user.email}','${user.city}')`;
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
