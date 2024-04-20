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
    }
});

const User = mongoose.Model("user", userSchema);
module.exports = User;