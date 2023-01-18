const express = require("express");
const { mongoConnection } = require("./inits/mongodb");
const { redisConnection } = require("./inits/redis");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});

app.get("/getAllCollections", async (req, res) => {
  try {
    let data = await mongoConnection.dbConnection.listCollections().toArray();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
app.get("/getAllKeywords", async (req, res) => {
  try {
    let col = await mongoConnection.dbConnection.collection("videos");

    let findData = await col
      .find({}, { projection: { query: 1, _id: 0 } })
      .toArray();
    res.status(200).json(findData);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
app.get("/document/:keyword", async (req, res) => {
  try {
    let { keyword } = req.params;

    // first check cache if not there then goto db
    let { redisClient } = redisConnection;
    redisClient
      .get(keyword)
      .then(async (value) => {
        // If inva;id Data found then throw error
        if (value != null) {
          res.status(200).json(JSON.parse(value));
          return;
        }

        // if value == null, means CACHE Miss OCCURED and we have to fetch this from DB
        let col = await mongoConnection.dbConnection.collection("videos");
        let findData = await col.find({ query: keyword });
        let findArr = await findData.toArray();

        if (findArr.length === 1) {
          await redisClient.set(keyword, JSON.stringify(findArr[0]));
          res.status(200).json(findArr[0]);
        } else {
          res.status(404).json({});
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error, msg: "maybe cache JSON error" });
      });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
app.listen(8000, () => {
  console.log("apiserver started");
});
