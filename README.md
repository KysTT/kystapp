# How to build:

install nodeJS, bun and mongoDB

clone github repo

build frontend first with ``bun run build`` in ./frontend

run the server with ``bun start`` in ./server

server will start on localhost:3000/

# Or with docker:

clone repo and run ``docker compose up --build``

server will start on localhost:3000/

#
<details>
  
  <summary>API docs</summary>

  all api routes start with /api
  
  <details>
  <summary>Authentication</summary>
    
  **GET ``/login`` sends you to kinde auth service, after login sends you back to index page, sets cookies**
    
  * access_token
  * id_token
  * refresh_token
  * user

  **GET ``/register`` sends you to kinde auth service, after register sends you back to index page, sets cookies**
  
  * access_token
  * id_token
  * refresh_token
  * user

  **GET ``/logout`` logs you out with kinde, and removes previosly set cookies**

  **GET ``/me`` uses middleware function to get user from cookies and find / add user to mongoDB/users collection**
  
  expected return: 
  ```
  {
    "user": {
      "id": "user_id",
      "sub": "user_sub_id",
      "name": "user_full_name",
      "email": "user_email",
      "picture": "user_picture",
      "given_name": "user_firstName",
      "updated_at": "timestamp",
      "family_name": "user_lastName",
      "email_verified": true || false,
      "preferred_username": "preferred_username" || null
    }
  }
  ```
  
  **GET ``/userRole`` uses middleware function to get user from cookies and find user role from mongoDB/users collection**
  
  expected return
  ```
  {
    "user" || "admin"
  }
  ```
  expected return if code 400
  ```
  {}
  ```

  **PUT ``/userRole`` uses middleware function to get user from cookies and changes user role from mongoDB/users collection**

  expected return with code 200
  ```
  {
    "admin" || "user"
  }
  ```

  expected return with code 400
  ```
  {}
  ```
  
  </details>
  <details>
  <summary>Expenses tracker app</summary>

  all routes start with /expenses
    
  **GET ``/`` gets their expenses from mongoDB/expenses collection**
  
  expected output
   
    [
      {
        "_id": "mondo_document_id",
        "expense_id": document_id,
        "date": "Wed Feb 05 2025",
        "user_id": "kinde_user_id",
        "title": "title",
        "amount": amount,
        "__v": 0
      },
      ...
    ]

  **POST ``/`` creates new expense in mongoDB/expenses collection**

  expected input
  ```
  {
    title: type String,
    amount: type Number,
    date: type String
  }
  ```
  
  expected return with code 200
  ```
  {
    "_id": "mongo_document_id",
    "expense_id": expense_id,
    "date": "Wed Feb 05 2025",
    "user_id": "kinde_user_id",
    "title": "title",
    "amount": amount,
    "__v": 0
  }
  ```

  expected return with code 400
  ```
  {}
  ```

  **GET ``/totalSpent`` gets users expenses from mongoDB/expenses collection**
  
  expected return
  ```
  {
    total: 0 || total_spent
  }
  ```

  **DELETE ``/:id{[0-9]+}`` deletes expenses by id from mongoDB/expenses collection**

  is should be same as expense_id
  
  expected return same as GET ``/`` but without deleted one.
  
  </details>
  <details>
  <summary>E-Store app</summary>
  
  **GET ``/`` returns all products from mongoDB/products collection**

  expected return
  ```
  {
    "products": [
      {
        "_id": "mongo_product_id",
        "product_id": product_id,
        "name": "name",
        "description": "description",
        "stock": stock,
        "price": price,
        "category": "category",
        "image_url": "image_url",
        "__v": 0
      },
      ...
    ]
  }
  ```

  **POST ``/`` creates new product by id from mongoDB/products collection**

  expected input
  ```
  {
    name: type String,
    description: type String,
    stock: type Number,
    price: type Number,
    category: type String,
    image_url: type String,
  }
  ```

  expected return 
  ```
  {
    "_id": "mongo_product_id",
    "product_id": product_id,
    "name": "name",
    "description": "description",
    "stock": stock,
    "price": price,
    "category": "category",
    "image_url": "image_url",
    "__v": 0
  }
  ```

  **GET ``/:id{[0-9]+}`` returns found product by id from mongoDB/products collection**

  expected return
  ```
  {
    "product": {
      {
        "_id": "mongo_product_id",
        "product_id": product_id,
        "name": "name",
        "description": "description",
        "stock": stock,
        "price": price,
        "category": "category",
        "image_url": "image_url",
        "__v": 0
      },
    }
  }
  ```

  expected return with status 400
  ```
  {}
  ```

  **PUT ``/:id{[0-9]+}`` changes product by id in mongoDB/products collection**

  expected input and output is the same as POST ``/``

  **GET ``/cart`` returns users' cart from mongoDB/carts collection**

  expected return
  ```
  [
    {
      "product": {
        "_id": "mongo_product_id",
        "product_id": product_id,
        "name": "name",
        "description": "description",
        "stock": stock,
        "price": price,
        "category": "category",
        "image_url": "image_url",
        "__v": 0
      },
      "quantity": quantity
    },
    ...
  ]
  ```

  **PUT ``/checkout`` proceeds with fake checkout, lowering stock of each item in the users' cart by quantity and returns empty cart**

  expected return
  ```
  []
  ```

  expected return with code 400
  ```
  {}
  ```

  **PUT ``/addToCart`` inceases quantity of product in users' cart and returns updated cart**

  expected return
  ```
  [
    {
      "product": {
        "_id": "mongo_product_id",
        "product_id": product_id,
        "name": "name",
        "description": "description",
        "stock": stock,
        "price": price,
        "category": "category",
        "image_url": "image_url",
        "__v": 0
      },
      "quantity": quantity+1
    },
    ...
  ]
  ```

  expected return with code 400
  ```
  {}
  ```

  **PUT ``/subtractFromCart`` lowers quantity of product in users' cart and returns updated cart**

  expected return
  ```
  [
    {
      "product": {
        "_id": "mongo_product_id",
        "product_id": product_id,
        "name": "name",
        "description": "description",
        "stock": stock,
        "price": price,
        "category": "category",
        "image_url": "image_url",
        "__v": 0
      },
      "quantity": quantity-1
    },
    ...
  ]
  ```

  expected return with code 400
  ```
  {}
  ```

  **DELETE ``/removeFromCart`` removes a product from users' cart and returns updated cart**

  expected output is the same as in GET ``/cart`` but without deleted one

  expected return with code 400
  ```
  {}
  ```
  </details>
</details>
