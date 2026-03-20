const express=require("express")

const router=express.Router()
const { isAuthenticateUser, authorizeRoles } = require("../Middlewares/auth");
const { newOrder, getAllOrders,getSingleOrder, addShippingDetails, getShippingDetails, updateShippingDetails, myOrders, deleteMyOrders } = require("../Controller/orderController");
const { payUmoneyPayment, payUMoneyPaymentSuccess, payUMoneyPaymentFail } = require("../Controller/paymentController");


router.route("/add-new-order").post(isAuthenticateUser,newOrder)
// router.route("/get-coupon-code-despount").post(couponCodeDiscount)
router.route("/admin/get-all-order-data").get(isAuthenticateUser,authorizeRoles("admin"),getAllOrders)
router.route("/admin/get-single-order-details/:id").get(isAuthenticateUser,getSingleOrder)
router.route("/admin/update-shipping-order-details/:id").put(isAuthenticateUser,authorizeRoles("admin"),updateShippingDetails)
router.route("/admin/get-shipping-order-details/:id").get(getShippingDetails)

router.route("/get-all-my-orders").post(isAuthenticateUser,myOrders)
router.route("/delete-my-orders").delete(deleteMyOrders)

router.route("/pay-u-money-payment").post(payUmoneyPayment)
router.route("/pay-u-money-payment-success").post(payUMoneyPaymentSuccess)
router.route("/pay-u-money-payment-fail").post(payUMoneyPaymentFail)
// router.route("/admin/update-discout-data/:id").put(isAuthenticateUser,authorizeRoles("admin"),updateDiscountDetails)




module.exports=router
