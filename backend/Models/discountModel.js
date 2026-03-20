const mongoose = require("mongoose")

const discountSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        DiscountType: {
            type: String,

        },
        DiscountValueType: {
            type: String,
        },
        DiscountValue: {
            type: Number
        },
        startDate:{
             type:Date,
        },
       
        endDate:{
            type:Date,
       },
        IsActive: {
            type: Boolean,
            default: "false"
        },
        couponCode:{
            type:String
        },
        maxQuantity:{
            type:String
        },
        
    }, {
    timestamps: true
}
)

const Discount = mongoose.model("Discount", discountSchema)
module.exports = Discount