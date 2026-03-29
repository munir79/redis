import { Product } from "./product.model.js";

// CREATE
 const createProduct = async (data) => {
  return await Product.create(data);
};

// GET ALL with pagination

 const getAllProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const products = await Product.find().skip(skip).limit(limit);
  const total = await Product.countDocuments();
  return { products, total, page, limit };
};

// GET Single product by ID
 const getProductById = async (id) => {
  return await Product.findById(id);
};

// UPDATE
 const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
 const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

export const productService={createProduct,getAllProducts,getProductById,updateProduct,deleteProduct}