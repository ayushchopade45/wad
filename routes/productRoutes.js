import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, realtedProductController, searchProductController, updateProductController } from '../controller/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

router.get('/get-product', getProductController)

router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get("/product-photo/:pid", productPhotoController)

router.delete('/product/:pid', deleteProductController)

//filter product

router.post('/product-filters', productFilterController);

router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController)

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

export default router