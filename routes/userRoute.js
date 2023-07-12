import express from "express";
import loginController from "../controllers/userController";
import registerController from "../controllers/userController";

//router object
const router = express.Router();

//routers
//POST || LOGIN
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

export default router;
