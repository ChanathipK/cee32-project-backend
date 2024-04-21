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
        const { username } = req.body;
        if (username) {
            try {
                const newUser = new User({
                    username: username,
                    attack: 1,
                    defence: 0,
                    hp: 20,
                    isDead: false
                });
                const id = newUser._id;
                await newUser.save();
                res.status(201).json(id);
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

// Fighting Area

// attack
router.post("/attack/:targetId", async (req, res) => {
    try {
        const { userId, isDefenceUsed } = req.body;
        if (userId && (isDefenceUsed !== null && isDefenceUsed !== undefined)) {
            const { targetId } = req.params;
            const user = await User.find({
                _id: userId
            });
            const target = await User.find({
                _id: targetId
            });
            if (isDefenceUsed) {
                target.hp -= (user.attack - target.defence);
            } else {
                target.hp -= user.attack;
            }
            if (target.hp <= 0) {
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
            const target = await User.find({
                _id: targetId
            });
            target.attack += attack;
            target.defence += defence;
            target.hp += hp;
            await target.save();
            res.status(201).json(target);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router