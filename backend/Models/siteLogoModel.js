const mongoose=require("mongoose")

const siteLogoSchema=new mongoose.Schema({

    logoName:{
        type:String,
        default:""
    },
    logoUrl:{
        type:String,
        default:""
    },
      file: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },

    },

},{
    timestamps:true
})

// module.exports=mongoose.model("ParentCategory",childCategorySchema)
const SiteLogo =mongoose.model("SiteLogo",siteLogoSchema)
module.exports=SiteLogo;
