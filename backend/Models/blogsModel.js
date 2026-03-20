const mongoose = require("mongoose")

const blogsSchema = new mongoose.Schema({
    mainTitle: {
        type: String,
        default: ""
    },
    Descriptions: {
        type: String,
        default: ""
    },

    ProductReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductReview'
    }],

    file: {
                   type: String,

    },
    IsActive: {
        type: String
    }

}, {
    timestamps: true
})

// module.exports=mongoose.model("ParentCategory",childCategorySchema)
const Blog = mongoose.model("Blog", blogsSchema)
module.exports = Blog;
