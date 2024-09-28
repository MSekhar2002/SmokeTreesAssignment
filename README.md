Here's a **README** file that you can use to provide instructions on how to start and run the backend project, including details about the API endpoints and how to test them.

---

# User Address Registration Backend

This project is a simple backend API built with **Node.js** and **SQLite** to manage user registrations and their addresses. It demonstrates how to store user data in a relational database with a **one-to-many** relationship between `users` and `addresses`.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
  - [Register User and Address](#post-register)
  - [Get All Users and Addresses](#get-users)
- [Sample API Requests](#sample-api-requests)
  - [Register User Example](#register-user-example)
  - [Get All Users Example](#get-all-users-example)

## Requirements

Before starting, make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) (version 14.x or above)
- npm (usually comes with Node.js)
- SQLite3 (Optional: You can use the SQLite CLI to interact with the database)

## Installation

1. Install the required dependencies:

   ```bash
   npm install
   ```

## Running the Project

1. Start the server:

   ```bash
   node server.js
   ```

   The server will start on `http://localhost:3001`.

## API Endpoints

### 1. **POST /register**
   - **Description**: Registers a new user along with an address. The user's name is stored in the `users` table, and the address is stored in the `addresses` table with a reference to the user ID.
   - **Content-Type**: `application/x-www-form-urlencoded`
   - **Request Body Parameters**:
     - `name`: The name of the user (string, required).
     - `address`: The address of the user (string, required).
   - **Response**: A JSON object containing the user's ID and the address's ID.

   Example:
   ```json
   {
     "message": "User and address created successfully",
     "userId": "uuid-for-user",
     "addressId": "uuid-for-address"
   }
   ```

### 2. **GET /users**
   - **Description**: Retrieves a list of all users and their associated addresses. This performs a left join between `users` and `addresses` to return the related data.
   - **Response**: A JSON array containing user information and their associated addresses.

   Example:
   ```json
   [
     {
       "userId": "uuid-for-user",
       "name": "Muni Sekhar",
       "addressId": "uuid-for-address",
       "address": "Tirupathi, India"
     },
     {
       "userId": "uuid-for-another-user",
       "name": "Vivek Sai Raju",
       "addressId": "uuid-for-another-address",
       "address": "Ogl, Nlr, Rjy, India"
     }
   ]
   ```

## Sample API Requests

You can use **Postman** or **cURL** to test the endpoints.

### Register User Example

**Request**: Register a user named `Muni Sekhar` with address `Tirupathi, India`.

- **Method**: `POST`
- **URL**: `http://localhost:3001/register`
- **Headers**: 
  - `Content-Type: application/x-www-form-urlencoded`
- **Body**:
  - `name: Muni Sekhar`
  - `address: Tirupathi, India`

**cURL Example**:
```bash
curl -X POST http://localhost:3001/register \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "name=Muni Sekhar" \
-d "address=Tirupathi, India"
```

**Expected Response**:
```json
{
  "message": "User and address created successfully",
  "userId": "uuid-for-john-doe",
  "addressId": "uuid-for-123-main-street"
}
```

### Get All Users Example

**Request**: Retrieve all users and their addresses.

- **Method**: `GET`
- **URL**: `http://localhost:3001/users`

**cURL Example**:
```bash
curl http://localhost:3001/users
```

**Expected Response**:
```json
[
  {
    "userId": "uuid-for-user",
    "name": "Muni Sekhar",
    "addressId": "uuid-for-address",
    "address": "Tirupathi, India"
  },
  {
    "userId": "uuid-for-another-user",
    "name": "Vivek Sai Raju",
    "addressId": "uuid-for-another-address",
    "address": "Ogl, Nlr, Rjy, India"
  }
]
```

## Additional Information

- The project uses **SQLite** as the database, and it automatically creates the necessary tables (`users` and `addresses`) when the server starts.

---

This **README** file provides clear instructions on how to set up and run the project, as well as detailed explanations of the available API endpoints with sample requests.

Thank You,
Maddili Muni Sekhar
6304022592
munisekhar654@gmail.com