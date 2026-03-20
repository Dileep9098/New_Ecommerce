const mongoose = require("mongoose")

const ContactSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
        },
        subject: {
            type: String,
        },
        message: {
            type: String,
        },


    }, {
    timestamps: true
}
)
const Contact = mongoose.model("contact", ContactSchema)
module.exports = Contact