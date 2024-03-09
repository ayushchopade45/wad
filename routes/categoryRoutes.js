import express from "express";
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryContoller, singleCategoryContoller, updateCatgeoryContoller } from "../controller/categoryController.js";

const router = express.Router();
//create category

router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

//update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCatgeoryContoller)
// get all category
router.get('/get-category', categoryController)

//single category
router.get('/single-category/:slug', singleCategoryContoller)


//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryContoller)
export default router