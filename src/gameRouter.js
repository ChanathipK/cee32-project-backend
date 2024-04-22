const express = require("express");
const mongoose = require("mongoose");
const Party = require("./parties.js");
const deck = require("./deck.js");

const sequence = [1, 2, 3, 4];

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
        const { id } = req.params;
        const party = await Party.findOne({
            _id: id
        });
        res.status(201).json(party);
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
            let copyDeck = [...deck];
            let shuffledDeck = shuffle(copyDeck);
            let copySequence = [...sequence];
            let shuffledSequence = shuffle(copySequence);
            const party = new Party({
                users: [userId],
                deck: shuffledDeck,
                turn: 1,
                team: shuffledSequence,
                round: 1,
                message: [],
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
            const party = await Party.findOne({
                _id: partyId
            });
            if (party.users.length >= 4) {
                res.status(400).send();
            } else if (party.users.length === 3) {
                let id = new mongoose.Types.ObjectId(userId);
                party.users.push(id);
                await party.save();
                res.status(201).json({
                    isReady: true,
                    partyId: partyId
                });
            } else {
                let id = new mongoose.Types.ObjectId(userId);
                party.users.push(id);
                await party.save();
                res.status(201).json({
                    isReady: false,
                    partyId: partyId,
                });
            }
        } else {
            res.status(400).send();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// delete party
router.delete("/delete/:partyId", async (req, res) => {
    try {
        const { partyId } = req.params;
        await Party.deleteOne({
            _id: partyId
        });
        res.status(201).send();
    } catch (err) {
        console.log(err);
    }
});

// draw card
router.post("/draw/:partyId", async (req, res) => {
    try {
        const { partyId } = req.params;
        const party = await Party.findOne({
            _id: partyId
        });
        const topCard = party.deck[party.deck.length - 1];
        party.deck.pop();
        // party.turn += 1;
        // if (party.turn === 5) {
        //     party.round += 1;
        //     party.turn = 1;
        // }
        await party.save();
        res.status(201).json(topCard);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// end turn
router.post("/end/:partyId", async (req, res) => {
    try {
        const { partyId } = req.params;
        const party = await Party.findOne({
            _id: partyId
        });
        party.turn += 1;
        if (party.turn === 5) {
            party.round += 1;
            party.turn = 1;
        }
        await party.save();
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// append message
router.post("/message/:partyId", async (req,res)=> {
    try {
        const { partyId } = req.params;
        const { message } = req.body;
        const party = await Party.findOne({
            _id: partyId
        });
        party.message.push(message);
        await party.save();
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router