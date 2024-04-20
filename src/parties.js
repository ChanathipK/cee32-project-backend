const mongoose = require("mongoose");

const partySchema = mongoose.Schema({
    users: {
        type: [mongoose.Types.ObjectId]
    }
});

const Party = mongoose.model("party", partySchema);
module.exports = Party;