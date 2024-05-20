# product-api

![Static Badge](https://img.shields.io/badge/personal-project-green)

This project is built with Node.js, Express, and MongoDB. It provides a simple API for managing product data within an organization. The application supports user authentication through JSON Web Tokens (JWT), ensuring secure access to various functionalities based on user roles.

## Features

- **User Registration & Login**: Users can register for an account and log in to access the products.
- **JWT Authentication**: Secure access to the API using JSON Web Tokens.
- **Product View**: Any user can view product information. Supports pagination.
- **Admin Privileges**:
  - Create product
  - Update products.
  - Delete products.
- **Token Expiration**: Implemented token expiration for enhanced security.

## Installation

1. Clone the repository
2. Navigate to the project directory: `cd product-api`
3. Install the required dependencies: `npm install`
4. Set up environment variables (e.g., Port, MongoDB connection string, JWT secret). Create a `.env` file with following contents.
```
MONGO_URI="<connection-string>"
PORT=<desired-port>
JWT_SECRET=<secret-key>
```
5. Start the server: `npm run dev`

## Post-Installation

1. Register a user through the API.
2. Perform database seeding to assign the ADMIN role to the first user:
   1. Access your MongoDB instance.
   2. Find the newly registered user document in the users collection.
   3. Update the user’s roles array by adding ADMIN.

## API Endpoints

- `GET /`: Returns welcome message
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: User login.
- `POST /products`: Add new product data. (Admins only)
- `GET /products`: Get a list of products.
- `GET /products/:id`: View product data by id.
- `PUT /products`: Update product data. (Admins only)
- `DELETE /products/:id`: Delete a product. (Admins only)

## Sample Requests

### Check system
```
curl http://localhost:3000/
```

### Register user
```
curl http://localhost:3000/auth/register/ \
-H 'Content-Type: application/json' \
-d '{ 
    "name": "John Doe", 
    "username": "john@example.com", 
    "password": "abcd1234" 
}'
```

### Login user
```
curl http://localhost:3000/auth/login/ \
-H 'Content-Type: application/json' \
-d '{ 
    "username": "john@example.com", 
    "password": "abcd1234" 
}'
```

### Create product
```
curl http://localhost:3000/products/ \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{ 
    "name": "Toblerone", 
    "description": "Delecious chocolates", 
    "status": "AVAILABLE" 
}'
```

### Get products
By default, it will return first 5 products.
```
curl http://localhost:3000/products -H 'Authorization: Bearer <token>'
```

For more information, specify **page** and **size** parameters.
```
curl http://localhost:3000/products?page=0&size=20 -H 'Authorization: Bearer <token>'
```

### Get product by id
```
curl http://localhost:3000/products/<product-id> -H 'Authorization: Bearer <token>'
```

### Update product
```
curl -X PUT http://localhost:3000/products/<product-id> \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{ 
    "name": "Surf Excel", 
    "description": "Detergent Powder with super powers", 
    "status": "AVAILABLE" 
}'
```

### Delete product
```
curl -X DELETE http://localhost:3000/products/<product-id> \
-H 'Authorization: Bearer <token>'
```
