const mongoose=require("mongoose")

const compaingnsSchema=new mongoose.Schema({

    mainTitle:{
        type:String,
        default:""
    },
    body:{
        type:String,
        default:""
    },
    DiscountTitle:{
        type:String,
        default:""
    },
    displayStartDate:{
        type:Date,
        default:Date.now()
    },
    displayEndDate:{
        type:Date,
        default:""
    },
      file: {
       type:String

    },
    IsActive:{
        type:String
    }

},{
    timestamps:true
})

// module.exports=mongoose.model("ParentCategory",childCategorySchema)
const Compaings =mongoose.model("Compaings",compaingnsSchema)
module.exports=Compaings;
