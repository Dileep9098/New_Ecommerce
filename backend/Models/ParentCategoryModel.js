const mongoose=require("mongoose")

const parentCategorySchema=new mongoose.Schema({
    Name:{
        type:String,
        default:""
    },
     file: {
       type:String

    },
}
,{
    timestamps:true
})

// module.exports=mongoose.model("ParentCategory",parentCategorySchema)
const ParentCategory =mongoose.model("ParentCategory",parentCategorySchema)
module.exports=ParentCategory;
