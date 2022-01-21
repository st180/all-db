const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 8080;
const mysql = require('mysql');
const cors = require('cors');

/**********************************************************/

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mocha16!',
    database: 'alldb',
    headers: { "Content-type": "application/x-www-form-urlencoded" }
});

/**********************************************************/

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("../dist/all-db/"));
app.use(cors({
    origin: '*'
}));
/**********************************************************/

app.get('/sql-users', (req, res, err) => {

  sql = 'SELECT * FROM mysql_users';

  dbConn.query(sql, function (error, results, fields) {
      if (error) throw error;
      return res.send(results);
  });

});

app.delete('/sql-users/:id', (req, res, err) => {

    var sql = `DELETE FROM mysql_users WHERE _id = ${req.params.id}`;
    dbConn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });

});

app.post('/sql-users', (req, res, err) => {

      let user = req.body;

      if (!user) {
          return res.status(400).send({ error:true, message: 'Please provide user' });
      }

      sql = `INSERT INTO mysql_users VALUES ("${user.name}","${user.email}","${user.city}",${user._id})`;

      dbConn.query(sql, { user: user }, function (error, results, fields) {
          if (error) throw error;
          return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
      });
  });

app.get('/', (req,res) => {
  res.sendFile("../dist/all-db/index.html")
});

/**********************************************************/

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
