// In-memory storage for products
let products = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    description: "High-performance laptop for work and gaming",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 599.99,
    description: "Latest smartphone with advanced features",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 199.99,
    description: "Premium wireless headphones with noise cancellation",
  },
];

let nextId = 4;

// Validation helper function
const validateProduct = (product) => {
  const errors = [];

  if (
    !product.name ||
    typeof product.name !== "string" ||
    product.name.trim().length === 0
  ) {
    errors.push("Product name is required and must be a non-empty string");
  }

  if (typeof product.price !== "number" || product.price <= 0) {
    errors.push("Price must be a positive number");
  }

  if (
    !product.description ||
    typeof product.description !== "string" ||
    product.description.trim().length === 0
  ) {
    errors.push(
      "Product description is required and must be a non-empty string"
    );
  }

  return errors;
};

// Get all products with pagination
const getAllProducts = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedProducts = products.slice(startIndex, endIndex);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(products.length / limit),
      totalItems: products.length,
      itemsPerPage: limit,
      hasNextPage: endIndex < products.length,
      hasPrevPage: page > 1,
    };

    res.status(200).json({
      success: true,
      data: paginatedProducts,
      pagination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get single product by ID
const getProductById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Create new product
const createProduct = (req, res) => {
  try {
    const { name, price, description } = req.body;

    const validationErrors = validateProduct({ name, price, description });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    const newProduct = {
      id: nextId++,
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim(),
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update product
const updateProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price, description } = req.body;

    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const validationErrors = validateProduct({ name, price, description });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    products[productIndex] = {
      ...products[productIndex],
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim(),
    };

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: products[productIndex],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete product
const deleteProduct = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Search products
const searchProducts = (req, res) => {
  try {
    const query = req.query.q;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const searchTerm = query.toLowerCase().trim();
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    res.status(200).json({
      success: true,
      data: filteredProducts,
      totalResults: filteredProducts.length,
      searchQuery: query,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
