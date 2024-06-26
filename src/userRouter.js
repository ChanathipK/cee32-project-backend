const express = require("express");
const User = require("./users.js");
const { ConnectionStates } = require("mongoose");

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
        const { username } = req.body;
        if (username) {
            const user = await User.findOne({
                username: username,
            });
            if (user !== null) {
                res.status(400).json({
                    isUsernameUsed: true
                })
            } else {
                try {
                    const newUser = new User({
                        username: username,
                        attack: 1,
                        defence: 0,
                        hp: 20,
                        hand: 0,
                        isDead: false
                    });
                    const id = newUser._id;
                    await newUser.save();
                    res.status(201).json(id);
                } catch (err) {
                    console.log(err);
                    res.status(400).send();
                }
            }
            
        } else {
            res.status(400).json();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// Fighting Area

// attack
router.post("/attack/:targetId", async (req, res) => {
    try {
        const { userId, isDefenceUsed } = req.body;
        if (userId && (isDefenceUsed !== null && isDefenceUsed !== undefined)) {
            const { targetId } = req.params;
            const user = await User.findOne({
                _id: userId
            });
            const target = await User.findOne({
                _id: targetId
            });
            if (isDefenceUsed) {
                if (target.defence < user.attack) {
                    target.hp -= (user.attack - target.defence);
                }
            } else {
                target.hp -= user.attack;
            }
            if (target.hp <= 0) {
                target.hp = 0;
                target.isDead = true;
                await target.save();
                res.status(201).json({
                    isTargetDead: true
                });
            } else {
                await target.save();
                res.status(201).json({
                    isTargetDead: false
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

// update stat
router.post("/stat/:targetId", async (req, res) => {
    try {
        const { attack, defence, hp } = req.body;
        if ((attack !== undefined) && (defence !== undefined) && (hp !== undefined)) {
            const { targetId } = req.params;
            const target = await User.findOne({
                _id: targetId
            });
            target.attack = attack;
            target.defence = defence;
            target.hp = hp;
            await target.save();
            res.status(201).json(target);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// update user's hand
router.post("/hand/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { number } = req.body;
        if(userId){
            const user = await User.findOne({
                _id: userId
            });
            user.hand += number;
            await user.save();
            res.status(202).json({
                accepted: "true"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// reset stat after game (may not be used)
router.post("/reset", async (req, res) => {
    try {
        await User.updateMany({}, {$set: {
            attack: 1,
            defence: 0,
            hp: 20,
            hand: 0,
            isDead: false,
        }});
        res.status(201).send();
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

// reset stat after game
router.post("/reset/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = User.findOne({
            _id: userId
        });
        if (user) {
            user.attack = 1;
            user.defence = 0;
            user.hp = 20;
            user.hand = 0;
            user.isDead = false;
            await user.save();
            res.status(201).json(user);
        } else {
            res.status(400).send();
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
})

module.exports = router