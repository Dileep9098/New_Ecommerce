const mongoose = require("mongoose")

const ShiprocketTokenSchema = mongoose.Schema(
    {
        token: {
            type: String,
        },
        added_on: {
            type: Date,
            default:Date.now()

        },

    }, {
    timestamps: true
}
)
const ShiprocketToken = mongoose.model("ShiprocketToken", ShiprocketTokenSchema)
module.exports = ShiprocketToken