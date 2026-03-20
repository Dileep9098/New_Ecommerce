const mongoose = require("mongoose")

const topbarSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    numberOfColumns: {
        type: Number,
        default: 1
    },
    texts:[
        { type: String ,
        default: "Welcome to My Store !Super Value Deals - Save more with coupons"
        }
    ],
    backgroundColor: {
        type: String,
        default: ""
    },
    textColor: {
        type: String,
        default: ""
    },
    language: {
        type: String,
        default: "" 
    },

    status: {
        type: String
    }

}, {
    timestamps: true
})

const TopBar = mongoose.model("TopBar", topbarSchema)
module.exports = TopBar;
