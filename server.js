const { MongoClient } = require('mongodb');

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
        await createListing(client, {
            taskContent: "testing",
            user: "myself",
            statue: 0,
            dateAdded: "210222"
        });
        await findTask(client,
            "210222")
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


main().catch(console.error);


async function createListing(client, newTask) {
    const result = await client.db("diary").collection("tasks").insertOne(newTask);
    console.log(`New task created with the following id: ${result.insertedId}`);
}

async function findTask(client, newTask) {
    const result = await client.db("diary").collection("tasks").find({ dateAdded: newTask });
    if (result) {
        console.log(`Found a task in the collection with the name '${newTask}':`);
        console.log(result);
    } else {
        console.log(`No task found with the name '${newTask}'`);
    }
}