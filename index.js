const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const cors = require('cors');
require('dotenv').config()

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gegfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('doctors_portal');
        const appointmentsCollection = database.collection('appointments');

        app.post('/appointments', async (req, res) => {
            const appointment = req.body;
            // console.log(appointment);
            const result = await appointmentsCollection.insertOne(appointment)
            res.json(result)

        })
    }
    finally {
        // client.close()
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello World! doctor portal')
})

app.listen(port, () => {
    console.log(`Example off doctor portal${port}`)
})