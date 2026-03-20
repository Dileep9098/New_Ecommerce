const mongoose = require("mongoose")

const hotDealBannerSchema = new mongoose.Schema({
    topTitle: {
        type: String,
        default: ""
    },
    mainTitle: {
        type: String,
        default: ""
    },
    bottomTitle: {
        type: String,
        default: ""
    },
    dealMainText: {
        type: String,
        default: ""
    },

    dealMainUrl: {
        type: String,
        default: ""
    },

    file:{
        type:String
    },

    
    IsActive: {
        type: String
    },
    AvailableStartDate: {
        type: Date,
        default: Date.now()
    },

    AvailableEndDate: {
        type: Date,
    },

}, {
    timestamps: true
})

// module.exports=mongoose.model("ParentCategory",childCategorySchema)
const HotDealBanner = mongoose.model("HotDealBanner", hotDealBannerSchema)
module.exports = HotDealBanner;
