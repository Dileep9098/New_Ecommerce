// const mongoose = require("mongoose")

// const productSizeSchema = mongoose.Schema(
//     {
//         ReviewBody: {
//             type: String,
//         },

//         ReviewEmail: {
//             type: String,
//         },
//         ReviewName: {
//             type: String,
//         },
//         ReviewRating: {
//             type: Number,
//         },
//         ReviewTitle: {
//             type: String,
//         },
//         ProductID: {
//             type: String,
//         },


//     }, {
//     timestamps: true
// }
// )
// const ProductReview = mongoose.model("ProductReview", productSizeSchema)
// module.exports = ProductReview



const mongoose = require("mongoose");

const productReviewSchema = mongoose.Schema(
  {
    ReviewBody: {
      type: String,
      
    },
    ReviewerEmail: {
      type: String,
      
    },
    ReviewerName: {
      type: String,
      
    },
    ReviewRating: {
      type: Number,
      
      min: 1,
      max: 5,
    },
    ReviewTitle: {
      type: String,
      
    },
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductReview", productReviewSchema);
