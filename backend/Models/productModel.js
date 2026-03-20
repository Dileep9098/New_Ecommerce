// // AttachmentURL	IsDiscountCreatePageSearchEnabled	Rating	TotalReviews	ProductId	ProductName	ShortDescription	FullDescription	VendorId	ManufacturerId	MetaTitle	MetaKeywords	MetaDescription	Price	OldPrice	IsTaxExempt	IsShippingFree	EstimatedShippingDays	ShowOnHomePage	AllowCustomerReviews	IsReturnAble	IsDigitalProduct	IsDiscountAllowed	Sku	CreatedOn	ModifiedOn	WarehouseId	InventoryMethodId	StockQuantity	IsBoundToStockQuantity	DisplayStockQuantity	OrderMinimumQuantity	OrderMaximumQuantity	MarkAsNew	DisplaySeqNo	IsActive	DiscountProductsMappings	OrderItems	ProductDigitalFileMappings	ProductPicturesMappings	ProductProductAttributeMappings	ProductReviews	ProductShippingMethodsMappings	ProductsCategoriesMappings	ProductsTagsMappings


// const mongoose=require("mongoose")

// const productSchema=mongoose.Schema({
//     AttachmentURL:{
//         type:String
//     },
//     IsDiscountCreatePageSearchEnabled:{
//         type:Boolean
//     },
//     Rating:{
//         type:Number
//     },
//     TotalReviews:{
//         type:String
//     },
//     ProductId:{
//         type:String
//     },
//     ProductName:{
//         type:String
//     },
//     ShortDescription:{
//         type:String
//     },
//     FullDescription:{
//         type:String
//     },
//     VendorId:{
//         type:String
//     },
//     ManufacturerId:{
//         type:String
//     },
//     MetaTitle:{
//         type:String
//     },
//     MetaKeywords:{
//         type:String
//     },
//     MetaDescription:{
//         type:String
//     },
//     MetaTitle:{
//         type:String
//     },
//     MetaTitle:{
//         type:String
//     },
//     MetaTitle:{
//         type:String
//     },
//     MetaTitle:{
//         type:String
//     },
//     MetaTitle:{
//         type:String
//     },
//     MetaTitle:{
//         type:String
//     },
//     MetaTitle:{
//         type:String
//     },
// })



const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    AttachmentURL: {
        type: String,
        required: false
    },
    IsDiscountCreatePageSearchEnabled: {
        type: Boolean,
        required: false
    },
    Rating: {
        type: Number,
        required: false
    },
    TotalReviews: {
        type: String,
        required: false
    },
    ProductId: {
        type: String,
    },
    ProductName: {
        type: String,
    },
    ShortDescription: {
        type: String,
        required: false
    },
    FullDescription: {
        type: String,
        required: false
    },
    VendorId: {
        type: String,
        required: false
    },
    Menufacturs: {
        type: mongoose.Schema.ObjectId,
        ref: "Menufacturs"

    },
    MetaTitle: {
        type: String,
        required: false
    },
    MetaKeywords: {
        type: String,
        required: false
    },
    MetaDescription: {
        type: String,
        required: false
    },
    Price: {
        type: Number,
        required: true
    },
    OldPrice: {
        type: Number,
        required: false
    },
    IsTaxExempt: {
        type: Boolean,
        required: false
    },
    IsShippingFree: {
        type: Boolean,
        required: false
    },
    ShippingCharge: {
        type: String,
        required: false
    },
    EstimatedShippingDays: {
        type: Number,
        required: false
    },
    ShowOnHomePage: {
        type: Boolean,
        required: false
    },
    AllowCustomerReviews: {
        type: Boolean,
        required: false
    },
    IsReturnAble: {
        type: Boolean,
        required: false
    },
    IsDigitalProduct: {
        type: Boolean,
        required: false
    },
    IsDiscountAllowed: {
        type: Boolean,
        required: false
    },
    Sku: {
        type: String,
        required: false
    },
    CreatedOn: {
        type: Date,
        required: false,
        default: Date.now
    },
    ModifiedOn: {
        type: Date,
        required: false
    },
    WarehouseId: {
        type: String,
        required: false
    },
    InventoryMethodId: {
        type: String,
        required: false
    },
    StockQuantity: {
        type: Number,
        required: false
    },
    IsBoundToStockQuantity: {
        type: Boolean,
        required: false
    },
    DisplayStockQuantity: {
        type: Boolean,
        required: false
    },
    OrderMinimumQuantity: {
        type: Number,
        required: false
    },
    OrderMaximumQuantity: {
        type: Number,
        required: false
    },
    MarkAsNew: {
        type: Boolean,
        required: false
    },
    DisplaySeqNo: {
        type: Number,
        required: false
    },
    IsActive: {
        type: Boolean,
        required: false
    },
    // DiscountProductsMappings: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Discount',
    //     default:""
    // },
    DiscountProductsMappings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount',
        default: null
    },
    OrderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
    ProductDigitalFileMappings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DigitalFile'
    }],
    ProductPictures: [
       {
        type:String
    }

    ],
    // ProductProductAttributeMappings: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'ProductAttribute'
    // }],
    ProductReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductReview'
    }],
    // ProductShippingMethodsMappings: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'ShippingMethod'
    // }],
    ProductsCategoriesMappings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChildCategory'
    }],
    ProductShippingMethodsMappings: {
        type: String,
        default: ""

    },
    ProductsTag: {
        type: String,
    },
    ProductColor: {
        type: String,
    },
    ProductSize: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProdcutSize',
    },
    CustomProductSize: {
        type: String,
    },
    Tax: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tax'
    },
    ProductWeight: {
        type: String,
    },
    // ProductsTagsMappings: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Tag'
    // }],

    AvailableStartDate: {
        type: Date,
        default: Date.now()
    },

    AvailableEndDate: {
        type: Date,
    },
    InternationCharge: {
        type: Number,
    },
},
    {
        timestamps: true
    });

// module.exports = mongoose.model("Product", productSchema);
const Product = mongoose.model("Product", productSchema)
module.exports = Product;