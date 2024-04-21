const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    attack: {
        type: Number,
        required: true,
    },
    defence: {
        type: Number,
        required: true,
    },
    hp: {
        type: Number,
        required: true,
    },
    isDead: {
        type: Boolean
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;