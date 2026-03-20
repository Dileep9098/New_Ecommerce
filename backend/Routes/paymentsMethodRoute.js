const express=require("express")

const router=express.Router()
const { isAuthenticateUser, authorizeRoles } = require("../Middlewares/auth");
const { addPaymentMethod, getAllPaymentMethod, deletePaymentMethod, updatePaymentMethod } = require("../Controller/paymentMethodController");
const { razorpayPayment, createRazorPayOrder } = require("../Controller/paymentController");
// const { razorpayPayment, createRazorPayOrder } = require("../Controller/paymentController");


router.route("/admin/add-payments-method").post(isAuthenticateUser,authorizeRoles("admin"),addPaymentMethod)
router.route("/admin/get-all-payments-method").get(getAllPaymentMethod)
router.route("/admin/delete-payments-method/:id").delete(isAuthenticateUser,authorizeRoles("admin"),deletePaymentMethod)
router.route("/admin/update-payments-method/:id").put(isAuthenticateUser,authorizeRoles("admin"),updatePaymentMethod)

router.route("/payment/verify").post(razorpayPayment)
router.route("/create-order-razorpay").post(createRazorPayOrder)



module.exports=router