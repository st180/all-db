
/*************************** IMPORTS *******************************/

const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 4001;
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const User = require('./User.model.js');
const mongodb = require('mongodb');

/**************************** MIDDLEWARE ******************************/

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("../../../../dist/all-db/"));
app.use(cors({
    origin: '*'
}));

/**************************** DB CONNECTION ******************************/
const dbName = 'alldb'
let db
let url = 'mongodb+srv://chailatte:ChaiLatte!@cluster0.5yda5.mongodb.net/alldb?retryWrites=true&w=majority';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)

  // Storing a reference to the database so you can use it later
  db = client.db(dbName)
  console.log(`Connected MongoDB: ${url}`)
  console.log(`Database: ${dbName}`)
})

/************************** ROUTES ********************************/

app.get('/', (req, res) => {
  res.send("server working");
});

app.get('/mongodb-users', (req, res) => {
  const client = new MongoClient(url);
  async function run() {

    try {
      await client.connect();
      const database = client.db("alldb");
      const collection = database.collection("alldb");

      const cursor = collection.find({}, {});

      let items = [];
      await cursor.forEach(function(doc){
        items.push(doc);
      });
      res.end(JSON.stringify(items));
    } catch (error){
      console.warn("ERROR: " + error);
      if (errCallback) errCallback(error);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})

app.post('/mongodb-users', (req, res) => {
    const client = new MongoClient(url);
    async function run() {
      try {
        await client.connect();
        const database = client.db("alldb");
        const collection = database.collection("alldb");

        const result = await collection.insertOne({
          "id": req.body.id,
          "name": req.body.name,
          "email": req.body.email,
          "city": req.body.city
        });
        res.end(JSON.stringify(result));
      } catch (e) {
        console.log("Error: " + e);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  })

/************/

app.get('/mongodb-users/:id/delete', (req, res) => {
  const client = new MongoClient(url);
  async function run() {
    try {
      await client.connect();
      const database = client.db("alldb");
      const collection = database.collection("alldb");

      const result = await collection.deleteOne({
        _id: new mongodb.ObjectID(`${req.params.id}`)
      });
      res.end(JSON.stringify(result));
    } catch (e) {
      console.log("Error: " + e);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})
/**************************** SERVER ******************************/

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

/**********************************************************/
/**********************************************************/
