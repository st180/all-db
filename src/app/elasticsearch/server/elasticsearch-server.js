const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 9200;
const cors = require('cors');
const elasticsearch = require('elasticsearch');
const client = elasticsearch.Client({
  host: 'localhost:9200'
});

/**********************************************************/

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("../../../../dist/all-db/"));
app.use(cors({
    origin: '*'
}));

/**********************************************************/

client.search({
  index: 'books',
  type: 'book',
  body: {
    query: {
      multi_match: {
        query: 'express js',
        fields: ['title', 'description']
      }
    }
  }
}).then(function(response) {
  var hits = response.hits.hits;
}).catch(function (error) {
  console.trace(error.message);
});

/**********************************************************/

/**********************************************************/

app.get('/elasticsearch-users', (req, res) => {
  const sql = "SELECT * FROM postgres_users;";
  pool.query(sql, function (error, results, fields) {
      return res.send(results.rows);
  });
});

app.delete('/elasticsearch-users/:id', (req, res) => {
  const sql = `DELETE FROM postgres_users WHERE _id = ${req.params.id}`;
  pool.query(sql, function (error, results, fields) {
    console.log("Number of records deleted: " + results.affectedRows);
  });
});

app.post('/elasticsearch-users', (req, res) => {
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
