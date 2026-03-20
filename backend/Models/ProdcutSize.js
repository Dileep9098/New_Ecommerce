const mongoose = require("mongoose")

const productSizeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            return: "true",
        },
        fullName: {
            type: String,
        },

        IsActive: {
            type: String,
            default: "false"
        },


    }, {
    timestamps: true
}
)
const ProdcutSize = mongoose.model("ProdcutSize", productSizeSchema)
module.exports = ProdcutSize