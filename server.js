const express = require("express");
const cors = require("cors");
const app = express();

// dotenv is used to load variable from `.env` or `.env.*` into `process` global variable
require('dotenv').config()

// setup cors
app.use(cors());

// setup body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Init Project");
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})