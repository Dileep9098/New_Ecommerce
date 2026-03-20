const express=require("express")

const router=express.Router()
const { isAuthenticateUser, authorizeRoles } = require("../Middlewares/auth");
const { addMenufacturs, getAllMenufactures, deleteMenufactures, updateMenufatures } = require("../Controller/menufactursController");


router.route("/admin/add-menufatures").post(isAuthenticateUser,authorizeRoles("admin"),addMenufacturs)
router.route("/admin/get-all-menufatures").get(getAllMenufactures)
router.route("/admin/delete-menufatures/:id").delete(isAuthenticateUser,authorizeRoles("admin"),deleteMenufactures)
router.route("/admin/update-menufatures/:id").put(isAuthenticateUser,authorizeRoles("admin"),updateMenufatures)




module.exports=router