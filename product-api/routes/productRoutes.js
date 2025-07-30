const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/productController");

// GET /products - Get all products with pagination
router.get("/", getAllProducts);

// GET /products/search - Search products
router.get("/search", searchProducts);

// GET /products/:id - Get single product by ID
router.get("/:id", getProductById);

// POST /products - Create new product
router.post("/", createProduct);

// PUT /products/:id - Update product
router.put("/:id", updateProduct);

// DELETE /products/:id - Delete product
router.delete("/:id", deleteProduct);

module.exports = router;
