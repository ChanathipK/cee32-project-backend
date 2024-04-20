const express = require("express");
const Party = require("./parties.js");

const deck = require("./deck.js");

// this function can be used to shuffle an array
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

const router = express.Router();

// get all parties
router.get("/parties", async (req, res) => {
    try {
        const parties = await Party.find({});
        res.status(200).json(parties);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// get party
router.get("/parties/:id", async (req, res) => {
    try {
        // aggregate
        /*
        {
            users: [User]
        }
        */

        // temp send
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// create party
router.post("/create", async (req, res) => {
    try {
        const { userId } = req.body;
        if (userId) {
            let partyDeck = [...deck];
            let shuffledDeck = shuffle(partyDeck);
            const party = new Party({
                users: [userId],
                deck: shuffledDeck
            });
            await party.save();
            res.status(201).json(party);
        } else {
            res.status(400).send();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

// join party
router.post("/join/:partyId", async (req, res) => {
    try {
        const { partyId } = req.params;
        const { userId } = req.body;
        if (userId) {
            await Party.updateOne({
                _id: partyId,
            }, {
                $push: {
                    users: userId
                }
            });
            res.status(201).json(partyId);
        } else {
            res.status(400).send();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

module.exports = router