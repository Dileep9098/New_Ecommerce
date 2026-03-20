const mongoose = require("mongoose")

const childCategorySchema = new mongoose.Schema({
    Name: {
        type: String,
        default: ""
    },
    file: {
        type:String

    },
    parentCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'ParentCategory'
    },
    IsActive: {
        type: String
    }

}, {
    timestamps: true
})

// module.exports=mongoose.model("ParentCategory",childCategorySchema)
const ChildCategory = mongoose.model("ChildCategory", childCategorySchema)
module.exports = ChildCategory;
