import express from "express";
import { productControllers } from "./product.controllers.js";
import { cacheMiddleware } from "../../middleware/cache.middleware.js";


const router = express.Router();

// POST → create product
router.post("/create-product", productControllers.createProductController);

// GET → all products with cache
router.get("/get-all-product", cacheMiddleware("products"), productControllers.getAllProductsController);

// GET → single product by ID
router.get("/get-single-product/:id", productControllers.getProductController);

// PUT → update product
router.put("/update-product/:id", productControllers.updateProductController);

// DELETE → delete product
router.delete("/delete-product/:id", productControllers.deleteProductController);

export const productRouter= router;