# E-commerce-fastify

## Description
- it is a backend application which provide web service using fastify Nodejs ,mysql and typeorm, it has a CRUD operations for products and categories and specify relations between them as well as show categories as tree


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [License](#license)

## Installation
1. Clone the repository: git clone https://github.com/HodaRoushdy/Coligo-nodejs.git
2. Install dependencies: npm install
3. set your own data in .env file like my .env.example file
4. run the migration to setup the database by : npm run migration:run
5. hit the urls specified in routes file to access crud operations using postman

## Usage
1. Start the server: npm run dev
2. Open your browser and visit http://localhost:{PORT} 

## API Documentation
- GET API on http://localhost:{PORT}/categories => retrieve all categories in my database 
- GET API on http://localhost:{PORT}/categories/:id=> retrieve only specific category in my database 
- GET API on http://localhost:{PORT}/categoriesTree/:id => retrieve the specified category and its subcategories and parent category so show it as tree in database with its id
- GET API on http://localhost:{PORT}/products=> retrieve all products in my database 
- GET API on http://localhost:{PORT}/products/:id => retrieve specific product in my database with its id
- POST API on http://localhost:{PORT}/products/addProduct => enable you to add your own product 
- POST API on http://localhost:{PORT}/categories/addCategory => enable you to add your own category
- PUT API on http://localhost:{PORT}/products/:id => enable you to update your product details  with its id
- PUT API on http://localhost:{PORT}/api/categories/:id =>: enable you to update your category details with its id
- DELETE API on http://localhost:{PORT}/products/:id => enable you to delete any product with its id 
- DELETE API on http://localhost:{PORT}/categories/:id => enable you to delete any category with its id 


## License
- Huda Roushdy

