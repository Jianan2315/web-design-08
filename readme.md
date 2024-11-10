# User Management API

This project is a RESTful API built using Node.js, Express, and MongoDB for managing user information. The API allows creating, updating, deleting, retrieving users, and uploading images. The project includes validation, strong password enforcement using `bcryptjs`, and image uploading using `multer`.

## Features

- User creation with validation and secure password hashing.
- User update functionality.
- User deletion by email.
- Retrieve all users.
- Image upload functionality (accepts JPEG, PNG, and GIF formats).
- Uses `bcryptjs` for password security and `multer` for file handling.

## Technologies Used

- Node.js
- Express
- MongoDB (Mongoose)
- bcryptjs
- multer
- Postman (for testing)

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Postman](https://www.postman.com/downloads/)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```
2. Navigate to the project directory:
   ```bash
   cd user-management-api
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory (optional) to specify environment variables like database URI if using a separate MongoDB instance.
5. Start the server:
   ```bash
   # For development (with automatic restart using nodemon)
   npx nodemon index.js
   # or if installed globally
   nodemon index.js
   ```
   Alternatively:
   ```bash
   node index.js
   ```

## API Endpoints

### User Creation
**Endpoint**: `POST /user/create`  
**Description**: Creates a new user with full name, email, and password.  
**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response**:
```json
{
  "message": "User created successfully",
  "user": { ... }
}
```

### Update User
**Endpoint**: `PUT /user/edit`  
**Description**: Updates a user's full name and/or password by email.  
**Request Body**:
```json
{
  "email": "john@example.com",
  "fullName": "John Updated",
  "password": "newpassword123"
}
```
**Response**:
```json
{
  "message": "User updated successfully",
  "user": { ... }
}
```

### Delete User
**Endpoint**: `DELETE /user/delete`  
**Description**: Deletes a user by their email.  
**Request Body**:
```json
{
  "email": "john@example.com"
}
```
**Response**:
```json
{
  "message": "User deleted successfully."
}
```

### Retrieve All Users
**Endpoint**: `GET /user/getAll`  
**Description**: Retrieves all users' data except for their hashed passwords.  
**Response**:
```json
{
  "message": "Users retrieved successfully",
  "users": [ ... ]
}
```

### Upload Image
**Endpoint**: `POST /user/uploadImage`  
**Description**: Uploads an image for a user.  
**Form Data**:
- `email` (string): User's email.
- `image` (file): Image file (JPEG, PNG, or GIF).
  **Response**:
```json
{
  "message": "Image uploaded successfully",
  "filePath": "path/to/uploaded/image.jpg"
}
```

## Project Structure

```
user-management-api/
├── index.js                 # Entry point for the server
├── models/
│   └── userModel.js         # Mongoose model for User
├── routes/
│   └── userRoutes.js        # Routes for user-related endpoints
├── controllers/
│   └── userController.js    # Controller functions for user operations
├── middlewares/
│   └── multerMiddleware.js  # Middleware for handling image uploads
├── images/                  # Directory to store uploaded images
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

## Testing the API

- Use [Postman](https://www.postman.com/) to test the API endpoints.
- For `POST`/`PUT` requests, ensure you include the `Content-Type: application/json` header and provide a valid JSON body.
- For image uploads, use the `form-data` option in Postman and set the key for the file as `image`.

## License

This project is licensed under the MIT License.
