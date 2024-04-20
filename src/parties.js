const mongoose = require("mongoose");

const partySchema = mongoose.Schema({
    users: {
        type: [mongoose.Types.ObjectId],
        unique: true,
    }
});

const Party = mongoose.Model("party", partySchema);
module.exports = Party;