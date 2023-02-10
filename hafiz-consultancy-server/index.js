const express = require('express');
const cors = require('cors');
// const { query } = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors());
app.use(express.json());


console.log(process.env.DB_USER)



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ploggwb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const visaServices = client.db('hconsultant').collection('visacategories');
    const reviewsCollections = client.db('hconsultant').collection('reviews');
    app.get('/visacategories', async (req, res) => {
      const query = {}
      const cursor = visaServices.find(query);
      const visaCat = await cursor.toArray();
      res.send(visaCat)
    })
    app.get('/visacategories/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const visaDetails = await visaServices.findOne(query);
      res.send(visaDetails)
    })
    app.get('/reviews', async (req, res) => {
      let query = {}
      if (req.query.email) {
        query = { email: req.query.email }
      }
      const cursor = reviewsCollections.find(query);
      const result = await cursor.toArray();
      res.send(result)
      console.log(result)
    })

    app.post('/reviews', async (req, res) => {
      const reviews = req.body;
      const result = await reviewsCollections.insertOne(reviews);
      res.send(result)
    })

  }
  finally {

  }

}
run().catch(err => console.error(err))


app.get('/', (req, res) => {
  res.send('express server is running')
})

app.listen(port, () => {
  console.log(`H Consultancy Running On ${port}`)
})