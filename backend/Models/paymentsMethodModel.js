const mongoose=require("mongoose")

const paymentsMethodSchema=mongoose.Schema(
  {
      name:{
        type:String,
        return:"true",
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

const PaymentMethod=mongoose.model("PaymentMethod",paymentsMethodSchema)
module.exports=PaymentMethod