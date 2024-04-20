// imports
const express = require("express");
const cors = require("cors");
const connect = require("./src/db.js");
const playerRouter = require("./src/userRouter.js");
const gameRouter = require("./src/gameRouter.js")

// create express app
const app = express();

// setup cors
app.use(cors());

// setup body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Init Project");
});

app.use("/api/v1/users", playerRouter);
app.use("/api/v1/game", gameRouter);

// dotenv is configured in ./src/db.js, so we don't have to config in server
app.listen(process.env.PORT, async () => {
    await connect();
    console.log(`Example app listening on port ${process.env.PORT}`)
});