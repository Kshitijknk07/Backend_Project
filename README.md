# 🚀 Product REST API

A robust and feature-rich REST API built with Node.js and Express.js for managing products with complete CRUD operations, input validation, search functionality, and pagination.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black.svg)](https://github.com/Kshitijknk07/Backend_Project)

## ✨ Features

- 🔄 **Complete CRUD Operations** - Create, Read, Update, Delete products
- ✅ **Input Validation** - Comprehensive validation for all product fields
- 🔍 **Search Functionality** - Search products by name and description
- 📄 **Pagination Support** - Efficient data pagination with metadata
- 🛡️ **Error Handling** - Proper HTTP status codes and error messages
- 🌐 **CORS Enabled** - Cross-origin request support
- 📝 **Request Logging** - Detailed request logging with timestamps
- 💾 **In-Memory Storage** - No database required, perfect for development

## 🏗️ Project Structure

```
product-api/
├── controllers/
│   └── productController.js    # Business logic and CRUD operations
├── routes/
│   └── productRoutes.js        # Route definitions
├── app.js                      # Main application file
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kshitijknk07/Backend_Project.git
   cd Backend_Project/product-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # Production mode
   npm start
   
   # Development mode (with auto-restart)
   npm run dev
   ```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API documentation and examples |
| `GET` | `/products` | Get all products (with pagination) |
| `GET` | `/products/:id` | Get a single product by ID |
| `POST` | `/products` | Create a new product |
| `PUT` | `/products/:id` | Update an existing product |
| `DELETE` | `/products/:id` | Delete a product by ID |
| `GET` | `/products/search?q=query` | Search products by name or description |

### Product Schema

```json
{
  "id": 1,
  "name": "Product Name",
  "price": 99.99,
  "description": "Product description"
}
```

## 🔧 API Examples

### Get All Products
```bash
curl http://localhost:3000/products
```

### Get Products with Pagination
```bash
curl "http://localhost:3000/products?page=1&limit=5"
```

### Get Product by ID
```bash
curl http://localhost:3000/products/1
```

### Create New Product
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gaming Mouse",
    "price": 79.99,
    "description": "High-precision gaming mouse with RGB lighting"
  }'
```

### Update Product
```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product",
    "price": 149.99,
    "description": "Updated description"
  }'
```

### Delete Product
```bash
curl -X DELETE http://localhost:3000/products/1
```

### Search Products
```bash
curl "http://localhost:3000/products/search?q=laptop"
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Validation errors array"]
}
```

## ✅ Validation Rules

- **name**: Required, non-empty string
- **price**: Required, positive number
- **description**: Required, non-empty string

## 📄 Pagination

The `/products` endpoint supports pagination with query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

Response includes pagination metadata:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## 🛠️ Technologies Used

- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment
- **[Express.js](https://expressjs.com/)** - Web application framework
- **[CORS](https://www.npmjs.com/package/cors)** - Cross-origin resource sharing
- **[Nodemon](https://nodemon.io/)** - Development auto-restart tool

## 📋 HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 🧪 Testing with Postman

Import this collection into Postman for easy testing:

```json
{
  "info": {
    "name": "Product API",
    "description": "REST API for managing products"
  },
  "item": [
    {
      "name": "Get All Products",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/products"
      }
    },
    {
      "name": "Create Product",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/products",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"name\": \"Test Product\", \"price\": 99.99, \"description\": \"Test description\"}"
        }
      }
    }
  ]
}
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kshitij Narayan Kulkarni**
- GitHub: [@Kshitijknk07](https://github.com/Kshitijknk07)

## 🙏 Acknowledgments

- Express.js community for the excellent framework
- Node.js community for the runtime environment
- All contributors and supporters

---

⭐ **Star this repository if you found it helpful!**