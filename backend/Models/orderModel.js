const mongoose = require("mongoose")

const orderItemSchema = new mongoose.Schema({

    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    OrderNote: {
        type: String,
        default: ""
    },
    PaymentMethod: {
        type: String,
    },
    cartJsonData: [
       { type: String,
        default: ""}
    ],
    CouponCode: {
        type: String,
        default: ""
    },
    paymentToken: {
        type: String,
        default: ""
    },
    payPalOrderConfirmJson: {
        type: String,
        default: ""
    },
    bank_ref_num: {
        type: String,
        default: ""
    },
    totalOrderPrice: {
        type: String,
        default: ""
    },
    Status: {
        type: String,
        default: "Active"
    },
    OrderNumber: {
        type: String,
        default: ""
    },
    txnid: {
        type: String,
    },
    mihpayid: {
        type: String,
    },



}, {
    timestamps: true
})

// module.exports=mongoose.model("ParentCategory",childCategorySchema)
const OrderItem = mongoose.model("OrderItem", orderItemSchema)
module.exports = OrderItem;
