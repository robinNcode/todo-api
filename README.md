# Todo API

A comprehensive Todo API built with NestJS, featuring JWT authentication, user management, and complete CRUD operations for todos.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing using bcrypt
- **User Management**: User profile management with password update capability
- **Todo Management**: Full CRUD operations with user-specific todo isolation
- **Input Validation**: Global validation pipe with detailed error messages
- **API Documentation**: Swagger/OpenAPI documentation at `/docs`
- **Type Safety**: Full TypeScript support with strict type checking
- **Database**: MySQL integration with TypeORM ORM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: NestJS 11
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: TypeORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Password Hashing**: bcrypt

## Project setup

```bash
$ npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=todo_db

# JWT Configuration
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=1h
```

## Compile and run the project

```bash
# development
$ npm run start:dev

# watch mode
$ npm run start

# production mode
$ npm run start:prod

# build
$ npm run build
```

## API Endpoints

### Authentication (Public)

#### Register
- **Method**: `POST`
- **URL**: `/api/auth/register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Response** (201):
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```

#### Login
- **Method**: `POST`
- **URL**: `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response** (200):
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```

### Users (Protected)

#### Get Profile
- **Method**: `GET`
- **URL**: `/api/users/profile`
- **Auth**: Bearer token required
- **Response** (200):
  ```json
  {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-06-11T10:00:00Z",
    "updatedAt": "2024-06-11T10:00:00Z",
    "todos": []
  }
  ```

### Todos (Protected)

#### Create Todo
- **Method**: `POST`
- **URL**: `/api/todos`
- **Auth**: Bearer token required
- **Body**:
  ```json
  {
    "title": "Complete project",
    "description": "Finish the todo API implementation"
  }
  ```
- **Response** (201): Todo object

#### Get All Todos
- **Method**: `GET`
- **URL**: `/api/todos`
- **Auth**: Bearer token required
- **Response** (200): Array of todo objects

#### Get Specific Todo
- **Method**: `GET`
- **URL**: `/api/todos/:id`
- **Auth**: Bearer token required
- **Response** (200): Todo object

#### Update Todo
- **Method**: `PATCH`
- **URL**: `/api/todos/:id`
- **Auth**: Bearer token required
- **Body**:
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "isCompleted": true
  }
  ```
- **Response** (200): Updated todo object

#### Delete Todo
- **Method**: `DELETE`
- **URL**: `/api/todos/:id`
- **Auth**: Bearer token required
- **Response** (204): No content

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Linting and Formatting

```bash
# Lint and fix code
$ npm run lint

# Format code
$ npm run format
```

## API Documentation

Once the server is running, visit `http://localhost:3000/docs` to access the Swagger UI with interactive API documentation.

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token-based authentication with expiration
- **Input Validation**: All inputs are validated using class-validator with custom decorators
- **User Isolation**: Users can only access and modify their own todos
- **Global Validation Pipe**: Automatic validation of all request bodies

## Database Schema

### Users Table
- `id` (UUID): Primary key
- `email` (VARCHAR): Unique email address
- `name` (VARCHAR): User's name
- `password` (VARCHAR): Hashed password
- `createdAt` (TIMESTAMP): Account creation time
- `updatedAt` (TIMESTAMP): Last update time

### Todos Table
- `id` (UUID): Primary key
- `userId` (UUID): Foreign key to Users table
- `title` (VARCHAR): Todo title
- `description` (TEXT): Todo description
- `isCompleted` (BOOLEAN): Completion status
- `createdAt` (TIMESTAMP): Creation time
- `updatedAt` (TIMESTAMP): Last update time

## Error Handling

The API uses global exception handling with standardized error responses:

```json
{
  "statusCode": 400,
  "message": "Invalid input",
  "error": "Bad Request"
}
```

## Author

MsM Robin

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
