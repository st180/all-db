const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 6001;
const cors = require('cors');

var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

/**********************************************************/

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE sqliteusers (
            id INTEGER UNIQUE PRIMARY KEY,
            name text,
            email text,
            city text,
            CONSTRAINT id UNIQUE (id)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO sqliteusers (id, name, email, city) VALUES (?,?,?,?)'
                db.run(insert, [1,"Alex","alex@example.com","NYC"])
                db.run(insert, [2,"Steve","steve@example.com","Paris"])
            }
        });
    }
});

/**********************************************************/

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("../../../../dist/all-db/"));
app.use(cors({
    origin: '*'
}));

/**********************************************************/

app.get('/sqlite-users', (req, res, next) => {
    var sql = `select * from sqliteusers`;
    db.all(sql, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.send(rows);
        })
      });


app.delete('/sqlite-users/:id', (req, res) => {
  const sql = `DELETE FROM sqliteusers WHERE id = ${req.params.id}`;
  db.all(sql, function (error, rows) {
    console.log("Deleted");
  });
});

app.post('/sqlite-users', (req, res) => {
  let user = req.body;
  console.log(this.user);

  sql = `INSERT INTO sqliteusers (id, name, email, city) VALUES (${user.id},'${user.name}','${user.email}','${user.city}')`;
  db.all(sql, function (error, rows) {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${rows.id}`)
  })
});

app.get('/', (req, res) => {
  res.sendFile("../../../../dist/all-db/index.html")
});

/**********************************************************/

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
