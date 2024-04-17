var Express = require("express");
var cors = require("cors");

const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId, Decimal128 } = require('mongodb');

var app = Express();
app.use(cors());
app.use(bodyParser.json());

var database;
const uri = 'mongodb+srv://marioiustinneagu:jGRdXQLzw8nYZ8Xf@tema-bd.f9yoilz.mongodb.net/';

const client = new MongoClient(
    uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
    }
);

const port = 8888;

async function run() {
    try {
        await client.connect();
        await client.db('admin').command({ ping: 1 });

        database = client.db('db');
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (exception) {
        console.log(exception);
    }
}

app.listen(port, () => {
    run().catch(console.dir);
    console.log(`Server listening on port ${port}`);
});

app.get("/getVideogames", async (req, res) => {
    let collection = await database.collection("Videogames");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  });

app.get("/getReviews/:videogameId", async (req, res) => {
    const videogameId = req.params.videogameId;

    let collection = await database.collection("Videogames");
    let results = await collection.findOne({ _id: new ObjectId(videogameId) })

    results = results.reviews;

    res.send(results).status(200);
});

app.get("/getConsoles/:videogameId", async (req, res) => {
    const videogameId = req.params.videogameId;

    let collection_games = await database.collection("Videogames");
    let game_results = await collection_games.findOne({ _id: new ObjectId(videogameId) })

    let supportedConsoleIds = game_results.supportedConsoles;

    let collection_consoles = await database.collection("Consoles");
    let results = await collection_consoles.find({ _id: { $in: supportedConsoleIds }}).toArray();

    res.send(results).status(200);
});

app.delete("/deleteVideogame/:videogameId", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.videogameId) };
    
        const collection = database.collection("Videogames");
        let result = await collection.deleteOne(query);
    
        res.send(result).status(200);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting videogame");
      }
})

app.patch("/editVideogame/:id", async (req, res) => {
    try {
    
      const { videogameId, newName, newReleaseDate, newGenre, newPrice} = req.body;

      const query = { _id: new ObjectId(videogameId) };
      const updates = {
        $set: {
            name: newName,
            releaseDate: new Date(newReleaseDate),
            genre: newGenre,
            releasePrice: Decimal128.fromString(newPrice),
        },
      };
  
      let collection = await database.collection("Videogames");
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating videogame");
    }
  });

  app.post("/addVideogame", async (req, res) => {
    try {
      const { name, releaseDate, genre, price } = req.body;
      const newDocument =   {
                name: name,
                releaseDate: new Date(releaseDate),
                genre: genre,
                releasePrice: Decimal128.fromString(price),
                reviews: [],
                supportedConsoles: []
      }
      let collection = await database.collection("Videogames");
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding videogame");
    }
  });