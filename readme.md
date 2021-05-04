# TinyBookStore - Simple Book Store

This is a E-Commerce Project fully built using Express, MongoDB, ReactJS and without any external CSS library. This project can be used as a starting point to build a more sophisticated, secure website.  


# Features
- [x] Login/Logout
- [x] Create Order
- [x] Search Book
- [x] Invoice
- [x] Shoping Cart

# Warning
This Project didn't do any password hashing before sending to DB


# Get Started

This folder include both frontend and backend. To make the website successful, please setup backend first and then front end.



### Backend Development Version List

```
"express": "^4.17.1",
"express-session": "^1.17.1",
"mongoose": "^5.12.7",
"nodemon": "^2.0.7"
"MongoDB": "4.4.5"
```

### Backend Development Version List

```
 "@testing-library/jest-dom": "^5.12.0",
 "@testing-library/react": "^11.2.6",
 "@testing-library/user-event": "^12.8.3",
 "http-proxy-middleware": "^0.19.1",
 "react": "^17.0.2",
 "react-dom": "^17.0.2",
 "react-router-dom": "^5.2.0",
 "react-scripts": "4.0.3",
 "web-vitals": "^1.1.1"
```

### Backend Setup

Step 1: Go the the backend folder

`cd backend`

Step 2: Install dependencies

`npm install`

Step 3: Import data to mongoDB

`mongoimport --jsonArray --db bookstore --collection book --file data/book.json`

This will automatically generate a bookstore database

Step 4: Setup your MongoDB Url in server.js

```js
// Connect to MongoDB database
mongoose.connect(
  "mongodb://localhost/bookstore",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.error(`MongoDB connection fail: ${err}`);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);
```

in which `mongodb://localhost/bookstore` would be your database

Step 5: Run the server

`npm run server`

The express server should start using `nodemon at PORT 5000` , or you can manuellly start using the following command `node server.js`



#### Some Details

The express server will automatically create the following collections:

```
bookstore
└─user  -- Store user credential
└─token -- Store valid user token
└─book  -- Store book
```



### Frontend Setup

Step 1: Go to the frontend folder

`cd frontend`

Step 2: Install dependencies

`npm install`

Step 3: Run ReactJS development server

`npm start`

 The ReactJS development server should start at __PORT 5000__

### Production Build

To creates a production build of the app, type
`npm run build`

this will generate a production build inside `/build` folder.
