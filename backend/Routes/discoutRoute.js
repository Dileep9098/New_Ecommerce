const express=require("express")

const router=express.Router()
const { isAuthenticateUser, authorizeRoles } = require("../Middlewares/auth");
const { addDiscount, getAllDiscountDetails, deleteDiscountDetails, updateDiscountDetails, couponCodeDiscount } = require("../Controller/discountController");


router.route("/admin/add-discout-data").post(isAuthenticateUser,authorizeRoles("admin"),addDiscount)
router.route("/get-coupon-code-despount").post(couponCodeDiscount)
router.route("/admin/get-all-discout-data").get(getAllDiscountDetails)
router.route("/admin/delete-discout-data/:id").delete(isAuthenticateUser,authorizeRoles("admin"),deleteDiscountDetails)
router.route("/admin/update-discout-data/:id").put(isAuthenticateUser,authorizeRoles("admin"),updateDiscountDetails)




module.exports=router