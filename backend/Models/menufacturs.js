const mongoose=require("mongoose")

const menufactursSchema=mongoose.Schema(
  {
      name:{
        type:String,
        return:"true",
        default:"Parijat Handicraft",
    },
      address:{
        type:String,
      
    },
    displaySeqNo:{
        type:Number,

    },
    IsActive:{
        type:String,
        default:"false"
    },
    

},{
    timestamps:true
}
)
const Menufacturs=mongoose.model("Menufacturs",menufactursSchema)
module.exports=Menufacturs