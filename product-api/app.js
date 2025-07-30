const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/products", productRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Product API is running!",
    version: "1.0.0",
    endpoints: {
      "GET /products": "Get all products (with pagination)",
      "GET /products/:id": "Get product by ID",
      "POST /products": "Create new product",
      "PUT /products/:id": "Update product",
      "DELETE /products/:id": "Delete product",
      "GET /products/search?q=query": "Search products",
    },
    examples: {
      "Get all products": "GET /products",
      "Get products with pagination": "GET /products?page=1&limit=5",
      "Search products": "GET /products/search?q=laptop",
      "Get product by ID": "GET /products/1",
      "Create product":
        'POST /products with body: {"name": "New Product", "price": 99.99, "description": "Product description"}',
      "Update product":
        'PUT /products/1 with body: {"name": "Updated Product", "price": 149.99, "description": "Updated description"}',
      "Delete product": "DELETE /products/1",
    },
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}`);
  console.log(`🔗 Products endpoint: http://localhost:${PORT}/products`);
});
