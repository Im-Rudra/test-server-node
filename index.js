const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ve3u0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const run = async () => {
  try {
    // await client.connect();
    const database = client.db('bu');
    const collection = database.collection('students');

    app.get('/users', async (req, res) => {
      await client.connect();
      const cursor = collection.find({});
      const result = await cursor.toArray();
      res.json(result);
      await client.close();
    });
  } finally {
    // await client.close();
  }
};

run().catch((err) => console.log(err.message));

app.get('/', (req, res) => {
  res.send('running the server properly');
});

app.listen(port, () => {
  console.log('Server running at port:', port);
});
