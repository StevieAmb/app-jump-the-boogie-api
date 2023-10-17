
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())

const password = process.env.SERVER_PW;
const uri = `mongodb+srv://Cluster32071:${password}@cluster0.kw7e6zd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(err) {
    console.log('made an error', err)
  }
}
run();

const dbName = "MusicalCafes";
const collectionName = "cafes";
const database = client.db(dbName);
const collection = database.collection(collectionName);

app.listen(1771, () => {
  console.log('You/re connected')
})

app.get('/api/cafes/getCafes', async (req, res) => {
  let cafes = await collection.find({}).toArray((err, result) => {
      return result
    })
  res.send(cafes)
})

