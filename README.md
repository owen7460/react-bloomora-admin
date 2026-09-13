# 🌸 Bloomora Merchant Admin

Merchant management dashboard for **Bloomora**, a florist management
platform designed to manage products, inventory, orders, customers, and
day-to-day flower shop operations.

This application provides the merchant-facing interface for the Bloomora
platform and communicates with the Bloomora FastAPI backend through REST
APIs.

---

## 🛠 Tech Stack

Technology Purpose

---

**React** Frontend UI library
**TypeScript** Type-safe JavaScript
**Vite** Development and build tool
**ESLint** Code quality and linting

Additional libraries will be introduced as the project develops.

---

## ✨ Features

### Product Management

- View products
- Create products
- Edit product information
- Delete products
- Manage product availability
- Manage product images
- Search and filter products

### Inventory Management

- View current inventory
- Update stock quantities
- View low-stock products
- Configure low-stock thresholds

### Order Management

- View customer orders
- View order details
- Update order status
- Search and filter orders

### Customer Management

- View customers
- View customer profiles
- View customer order history

### Dashboard

- Sales overview
- Revenue statistics
- Recent orders
- Inventory status
- Low-stock alerts

### Authentication

- Merchant login
- JWT-based authentication
- Protected routes
- Role-based access control

---

## 📁 Project Structure

Planned project structure:

```text
src/
│
├── api/
│   ├── client.ts
│   ├── products.ts
│   ├── inventory.ts
│   ├── orders.ts
│   └── customers.ts
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── common/
│
├── features/
│   ├── products/
│   ├── inventory/
│   ├── orders/
│   ├── customers/
│   └── auth/
│
├── pages/
│   ├── Dashboard/
│   ├── Products/
│   ├── Inventory/
│   ├── Orders/
│   ├── Customers/
│   └── Login/
│
├── hooks/
├── stores/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

---

## 🔌 Backend API

Bloomora Merchant Admin communicates with the Bloomora FastAPI backend.

```text
React
   ↓
API Client
   ↓
FastAPI REST API
   ↓
Service Layer
   ↓
SQLAlchemy
   ↓
MySQL
```

The initial frontend development will integrate with the Product API:

```http
GET     /api/products
GET     /api/products/{id}
POST    /api/products
PATCH   /api/products/{id}
DELETE  /api/products/{id}
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file when API integration is introduced:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

> Never commit `.env` files containing sensitive configuration.

### 3. Start the Development Server

```bash
npm run dev
```

---

## 🗺 Roadmap

### Phase 1 --- Foundation

- [ ] React + TypeScript project setup
- [ ] Project folder architecture
- [ ] React Router configuration
- [ ] Global layout
- [ ] Sidebar navigation
- [ ] API client configuration

### Phase 2 --- Product Management

- [ ] Product list page
- [ ] Product details
- [ ] Create product
- [ ] Edit product
- [ ] Delete product
- [ ] Product search
- [ ] Product filtering
- [ ] Product availability controls

### Phase 3 --- Authentication

- [ ] Login page
- [ ] Authentication state
- [ ] JWT handling
- [ ] Protected routes
- [ ] Logout
- [ ] Role-based UI authorization

### Phase 4 --- Business Operations

- [ ] Inventory management
- [ ] Category management
- [ ] Customer management
- [ ] Order management
- [ ] Order status workflow

### Phase 5 --- Dashboard & Analytics

- [ ] Dashboard overview
- [ ] Revenue metrics
- [ ] Sales analytics
- [ ] Inventory analytics
- [ ] Low-stock alerts
- [ ] Recent order activity

### Phase 6 --- AI Features

- [ ] AI florist assistant
- [ ] Inventory insights
- [ ] Product description generation
- [ ] Sales summaries
- [ ] Natural-language business queries

---

## 🎯 Project Goals

Bloomora Merchant Admin is designed to provide a practical,
production-oriented management interface for florist businesses.

The project focuses on:

- Scalable React architecture
- Reusable UI components
- Type-safe frontend development
- REST API integration
- Server-state management
- Authentication and authorization
- Responsive dashboard design
- Maintainable feature-based architecture

TODO:

- Add response schemas for product endpoints
- Add GetProductsResponse schema
- Use response_model in FastAPI routers
- Normalize is_active to boolean in API responses
