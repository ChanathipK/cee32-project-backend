const mongoose = require("mongoose");

const partySchema = mongoose.Schema({
    users: {
        type: [mongoose.SchemaTypes.ObjectId]
    },
    deck: {
        type: [Number],
    },
    turn: {
        type: Number
    },
    team: {
        type: [Number]
    },
    round: {
        type: Number
    },
    message: {
        type: [String]
    }
});

const Party = mongoose.model("party", partySchema);
module.exports = Party;