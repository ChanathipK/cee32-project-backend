const express = require("express");
const cors = require("cors");
const app = express();

// dotenv is used to load variable from `.env` or `.env.*` into `process` global variable
require('dotenv').config()

app.use(cors());

app.get("/", (req, res) => {
    res.send("Init Project");
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})