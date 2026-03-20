const mongoose = require("mongoose")

const shippingDetailsSchema = new mongoose.Schema({

    orderItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    AddressID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    
    ProductImage: {
        type: String,
    },
    ProductName: {
        type: String,
    },

    shippingMethod: {
        type: String,
    },
    shippingStatus: {
        type: String,
    },
    shipper: {
        type: String,
    },
    departure_date: {
        type: String,
    },
    receiver_date: {
        type: String,
    },
    receiver_name: {
        type: String,
    },
    receiver_mobile: {
        type: String,
    },
    receiver_indentity_no: {
        type: String,
    },
    TrackingNumber: {
        type: String,
    },
    length: {
        type: String,
    },
    height: {
        type: String,
    },
    weight: {
        type: String,
    },
    breadth: {
        type: String,
    },
    shiprocket_order_id:{
        type:String
    },
    shiprocket_shipment_id:{
        type:String
    },



}, {
    timestamps: true
})

// module.exports=mongoose.model("ParentCategory",childCategorySchema)
const ShippingDetails = mongoose.model("ShippingDetails", shippingDetailsSchema)
module.exports = ShippingDetails;
