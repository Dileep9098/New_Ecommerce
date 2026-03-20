const mongoose = require("mongoose")

const subscridersSchema = mongoose.Schema(
    {
       
        email: {
            type: String,
        },
        


    }, {
    timestamps: true
}
)
const Subscriders = mongoose.model("Subscriders", subscridersSchema)
module.exports = Subscriders