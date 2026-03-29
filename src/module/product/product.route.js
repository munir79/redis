import express from "express";
import { productControllers } from "./product.controllers.js";
import { cacheMiddleware } from "../../middleware/cache.middleware.js";


const router = express.Router();

// POST → create product
router.post("/", productControllers.createProductController);

// GET → all products with cache
router.get("/", cacheMiddleware("products"), productControllers.getAllProductsController);

// GET → single product by ID
router.get("/:id", productControllers.getProductController);

// PUT → update product
router.put("/:id", productControllers.updateProductController);

// DELETE → delete product
router.delete("/:id", productControllers.deleteProductController);

export default router;