const express = require("express");
const Party = require("./parties.js");

const router = express.Router();

router.get("/parties", async (req, res) => {
    try {
        const parties = await Party.find({});
        res.status(200).json(parties);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

router.get("/parties/:id", async (req, res) => {
    try {
        // aggregate
        /*
        {
            users: [User]
        }
        */

        // temp send
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

module.exports = router