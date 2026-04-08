# E-Commerce Backend Project Roadmap

## Overview
This document outlines the complete development tasks for the Node.js/Express eCommerce backend.

**Tech Stack**: Express.js, Mongoose/MongoDB, JWT, Joi (validation), Jest (testing).

Version: 1.0 | Last Updated: $(date)

## 1. Project Setup & Dependencies
- Initialize package.json with core deps (express, mongoose, dotenv, bcryptjs, jsonwebtoken, joi, cors, helmet) (High | S)
- Setup .env template with DB_URI, JWT_SECRET, PORT (High | S)
- Install dev deps: nodemon, jest, supertest, eslint, prettier (Med | S)
  - Run `npm install --save-dev ...`
- Git ignore updates (.env, node_modules, logs) (Low | S)
- Root-level README.md with setup/run instructions, API overview (Med | M)

## 2. Configuration
- config/database.js: Mongoose connection with retry logic, env validation (High | M)
- config/jwt.js: JWT config (secret, expiry), verify/sign helpers (High | S)
- utils/helpers.js: Common utils (logger, response formatter, validators) (Med | M)

## 3. Models
All models with indexes, validation, timestamps.
- models/User.js: email/password hash (bcrypt), role (admin/user), schema (High | M)
- models/Product.js: name/price/desc/image/stock/category, schema (High | M)
- models/Cart.js: user ref, products array (with qty), total calc (Med | M)
- models/Order.js: user ref, items/status/payment, populate support (Med | M)

## 4. Middleware
- middleware/auth.js: JWT verify, attach req.user, role checks (High | M)
- middleware/validation.js: Joi schemas for all inputs (High | M)
- middleware/errorHandler.js: Global error catcher, validation errors, 404 (Med | M)

## 5. Controllers & Routes - Authentication
- controllers/authController.js: register/login/logout (High)
- routes/authRoutes.js: POST /register, /login; protected /profile (High | S)

## 6. Controllers & Routes - Products
- controllers/productController.js: CRUD (create/read/update/delete/search/filter) (High | L)
  - Admin-only create/update/delete
- routes/productRoutes.js: GET/POST/PUT/DELETE /api/products (High | M)

## 7. Controllers & Routes - Cart
- controllers/cartController.js: addItem/removeItem/updateQty/getCart/clear (Med | L)
  - Compute totals with stock checks
- routes/cartRoutes.js: /api/cart (protected) (Med | M)

## 8. Controllers & Routes - Orders
- controllers/orderController.js: createOrder/getOrders (user/admin), updateStatus (Med | L)
  - Integrate payment webhook stub
- routes/orderRoutes.js: /api/orders (protected) (Med | M)

## 9. Core App Integration
- src/app.js: Express setup, routes mount, middleware chain, server listen (High)

## 10. Testing
- Unit tests: models validation, utils (Med | L)
- Integration tests: auth flow, CRUD endpoints (supertest) (High | L)
- Run coverage >80%: `npm test -- --coverage` (Med | S)

## 11. Security & Performance
- Rate limiting (express-rate-limit) (High | M)
- Input sanitization, CORS strict (High | S)
- Pagination/search optimization on products (Med | M)
- Logging (winston/morgan) (Low | M)

## 12. Deployment
- Dockerfile & docker-compose (MongoDB + app) (Med | M)
- PM2 ecosystem.config.js for production (Med | S)
- CI/CD: GitHub Actions for test/lint/deploy (Low | L)
- Environment-specific configs (prod DB, etc.) (Med | M)

## 13. Documentation
- app.js
- controllers/authController.js
- All other files: JSDoc comments (Med | L)
- Swagger/OpenAPI docs (/api-docs) (Low | M)
- Postman collection for API testing (Low | S)

Track changes via git branches (feature/*). Ping for blockers!

