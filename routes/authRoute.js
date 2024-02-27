import express from "express";
import { registerController, loginController, testController } from "../controller/authContoller.js"
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
//router object
const router = express.Router()

//routing
//register || method post 
router.post('/register', registerController)
//login//post

router.post('/login', loginController)
router.get("/test", requireSignIn, isAdmin, testController);

export default router;