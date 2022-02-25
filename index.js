// app.METHOD(PATH, HANDLER)
const { MongoClient } = require('mongodb');
var bodyParser = require('body-parser')

function getThisDate() {
    const dateObject = new Date();
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${day}${month}${year}`
}


async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://samer:hatemathtopo@cluster0.sb86t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // await createListing(client, {
        //     taskContent: "testing",
        //     user: "myself",
        //     statue: 0,
        //     dateAdded: "210222"
        // });
        // await findTask(client,
        //     "210222")
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json())

const port = 3000
const uri = "mongodb+srv://samer:hatemathtopo@cluster0.sb86t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const client = new MongoClient(uri);
async function findTask(client, newTask) {
    const result = await client.db("diary").collection("tasks").findOne({ dateAdded: newTask });
    if (result) {
        console.log(`Found a task in the collection with the name '${newTask}':`);
        console.log(result);
        return result;
    } else {
        console.log(`No task found with the name '${newTask}'`);
        return {
            message: "error",
        }
    }
}



app.get('/Tasks/', async(req, res) => {
    try {
        let data = [];
        await client.connect();
        const query = { dateAdded: getThisDate() };
        const cursor = client.db("diary").collection("tasks").find(query);
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }
        await cursor.forEach((i) => {
            data.push(i);
            console.log(i);
        });
        res.status(200).json({ data });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }


})

app.post('/', async(req, res) => {
    try {
        let payLoad = JSON.stringify(req.body, null, 2);
        // console.log(req.body);
        await client.connect();
        // res.send(req.params.id);
        // console.log(JSON.parse(payLoad));
        // res.send("f");
        await client.db("diary").collection("tasks").insertOne(JSON.parse(payLoad)).then((x) => {

            res.status(201).send(x);
        }).catch(() => { res.status(422).send("erreur") });

    } catch (error) {
        res.send(error);
    } finally {
        await client.close();
    }



})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})