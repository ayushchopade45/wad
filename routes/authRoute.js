import express from "express";
import { registerController, loginController, testController, forgotPasswordController } from "../controller/authContoller.js"
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
//router object
const router = express.Router()

//routing
//register || method post 
router.post('/register', registerController)
//login//post

router.post('/login', loginController)
//forgot pass
router.post('/forgot-password', forgotPasswordController)


router.get("/test", requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router;