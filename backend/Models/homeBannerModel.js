const mongoose=require("mongoose")

const homeBannerSchema=new mongoose.Schema({
    topTitle:{
        type:String,
        default:""
    },
    mainTitle:{
        type:String,
        default:""
    },
    bottomTitle:{
        type:String,
        default:""
    },
    leftButtonText:{
        type:String,
        default:""
    },
    rightButtonText:{
        type:String,
        default:""
    },
    leftButtonUrl:{
        type:String,
        default:""
    },
    rightButtonUrl:{
        type:String,
    },
    DisplayNo:{
        type:Number,
        default:""
    },

     file: {
       type:String,
       require:true

    },
    //  file: {
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     url: {
    //         type: String,
    //         required: true
    //     },

    // },
    IsActive:{
        type:String
    },
    bannerStyle:{
        type:String,
        default:"style1"
    }

},{
    timestamps:true
})

// module.exports=mongoose.model("ParentCategory",childCategorySchema)
const HomeBanner =mongoose.model("HomeBanner",homeBannerSchema)
module.exports=HomeBanner;
