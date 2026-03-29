import redisClient from "../../config/redis.js";
import { productService } from "./product.service.js";


// GET ALL products
 const getAllProductsController = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const data = await productService.getAllProducts(page, limit);

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// GET single product by ID
 const getProductController = async (req, res, next) => {
  try {
    const cacheKey = `product:${req.params.id}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Single Product Cache Hit:", cacheKey);
      return res.json({ success: true, source: "cache", product: JSON.parse(cachedData) });
    }

    const product = await productService.getProductById(req.params.id);

    // save to cache
    await redisClient.set(cacheKey, JSON.stringify(product), { ex: 60 });

    res.status(200).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// CREATE product
 const createProductController = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);

    // invalidate all products list cache
    const keys = await redisClient.keys("products:/api/v1/product/get-product*");
    if (keys.length) await redisClient.del(keys);

    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// UPDATE product
 const updateProductController= async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);

    // invalidate all relevant caches
    const keys = await redisClient.keys("products:/api/v1/product/get-product*");
    if (keys.length) await redisClient.del(keys);

    await redisClient.del(`product:${req.params.id}`);

    res.status(200).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// DELETE product
 const deleteProductController = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);

    // invalidate caches
    const keys = await redisClient.keys("products:/api/v1/product/get-product*");
    if (keys.length) await redisClient.del(keys);

    await redisClient.del(`product:${req.params.id}`);

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};

export const productControllers={createProductController,getAllProductsController,getProductController,updateProductController,deleteProductController}