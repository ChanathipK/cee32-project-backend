const express = require("express");
const User = require("./users.js");

const router = express.Router();

// get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// get specific user with id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({_id: id});
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// register
router.post("/register", async (req, res) => {
    try {
        const {username, attack, defence, hp} = req.body;
        if (username && attack && defence && hp) {
            try {
                const newUser = new User({
                    username: username,
                    attack: attack,
                    defence: defence,
                    hp: hp,
                });
                const id = newUser._id;
                await newUser.save();
                res.status(200).json(id);
            } catch (err) {
                console.log(err);
                res.status(400).send();
            }
            
        } else {
            res.status(400).json();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router