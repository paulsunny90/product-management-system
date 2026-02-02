# Simple Product Management System

A simple Product Management System built using Node.js, Express, and MySQL. This application allows users to securely log in and manage products with full CRUD operations

## Features
- Login Page (HTML/CSS)
- Product Dashboard (Product listing with Add, Edit, and Delete functionality)
- REST APIs (Node.js & Express)
- MySQL Database Integration
- Basic Reporting (Total Products, Total Stock, Total Value)

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Frontend:** HTML, CSS, javascript
- **Authentication:** express-session & bcryptjs
- **File Uploads:** multer

## Prerequisites
- Node.js installed
- MySQL Server installed and running

## Setup Instructions

### 1. Database Setup
- Open your MySQL terminal or a GUI like phpMyAdmin/MySQL Workbench.
- Import the `db.sql` file provided in the repository to create the database and tables.
- The `db.sql` file also inserts a default admin user.

### 2. Configuration
- Check the `.env` file in the root directory.
- Update the database credentials (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) to match your local MySQL setup.

### 3. Installation
Navigate to the project directory and install the dependencies:
```bash
npm install
```

### 4. Running the Application
Start the server using the following command:
```bash
node app.js
```
The application will be available at `http://localhost:5000`.

## Default Login Credentials
- **Username:** admin
- **Password:** admin123

## Submission Guidelines Check
- [x] Complete source code
- [x] MySQL database export (`db.sql`)
- [x] README file with instructions
- [x] Runnable via `node app.js`
- [x] Clean, well-structured, and commented code
