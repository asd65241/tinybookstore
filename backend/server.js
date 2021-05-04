const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();

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

// Define new Schema
let userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

let bookSchema = new mongoose.Schema({
  BookId: String,
  BookName: String,
  Publisher: String,
  Category: String,
  Lang: String,
  Author: String,
  Description: String,
  Price: Number,
  Published: String,
  "New Arrival": String,
});

let tokenSchema = new mongoose.Schema({
  token: String,
  expiry: Number,
});

let User = mongoose.model("user", userSchema, "user");
let Book = mongoose.model("book", bookSchema, "book");
let Token = mongoose.model("token", tokenSchema, "token");

// Helper Function
const indexPage = (req, res) => {
  res.send(`This is the bookstore api root page!`);
};
const runServer = () => {
  console.log("Server run at port 5000!");
};

const getBookByParms = (req, res) => {
  console.log(req.query);

  if (req.query.get === "all") {
    Book.find().exec((err, result) => {
      if (err) {
        console.error(`Database Error: ${err}`);
      }
      if (result.length > 0) {
        return res.json({ msg: result, status: "success" });
      } else {
        return res.json({ msg: "No Record", status: "error" });
      }
    });
  } else if (req.query.get === "cat") {
    Book.distinct("Category").exec((err, result) => {
      if (err) {
        console.error(`Database Error: ${err}`);
      }
      if (result.length > 0) {
        return res.json({ msg: result, status: "success" });
      } else {
        return res.json({ msg: "No Record", status: "error" });
      }
    });
  } else if (req.query.cat != null) {
    Book.find({ Category: req.query.cat }).exec((err, result) => {
      if (err) {
        console.error(`Database Error: ${err}`);
      }
      if (result.length > 0) {
        return res.json({ msg: result, status: "success" });
      } else {
        return res.json({ msg: "No Record", status: "error" });
      }
    });
  } else {
    let query = {};

    if (req.query.id != null || req.query.search == null) {
      query = { BookId: req.query.id };
    } else if (req.query.id == null || req.query.search != null) {
      query = {
        $or: [
          { BookName: new RegExp(req.query.search, "i") },
          { Author: new RegExp(req.query.search, "i") },
        ],
      };
    }

    Book.find(query).exec((err, result) => {
      if (err) {
        console.error(`Database Error: ${err}`);
      }
      if (result.length > 0) {
        return res.json({ msg: result, status: "success" });
      } else {
        return res.json({ msg: "No Record", status: "error" });
      }
    });
  }
};

// Index Page
app.get("/", indexPage);

// Authenticate API
const checkLogin = (req, res) => {
  console.log(`User Session ID: ${req.session.id}`);
  if (req.query.action && req.query.action == "Logout") {
    Token.deleteOne({ token: req.session.id }).then(() => {
      return res.json({ msg: "Logout Success!", status: "success" });
    });
  } else {
    // Check if session id is valid
    Token.findOne({ token: req.session.id }, (err, result) => {
      if (err) {
        console.error("Error in checking token in DB");
      }
      if (result == null) {
        return res.json({
          msg: "No Valid Token! Please Login Again!",
          status: "error",
        });
      } else {
        // Check if token expired
        let current_time = new Date().getTime();
        if (result.epxiry < current_time) {
          return res.json({
            msg: "Session Expired! Please Login Again!",
            status: "error",
          });
        } else {
          // Refresh Token Expiry
          let newTime = new Date().getTime() + 3600000;

          // Update document in DB
          Token.updateOne(result, { expiry: newTime }, (err, result) => {
            if (err) {
              console.error("Cannot Update Token");
            }
          });

          return res.json({
            msg: "Valid Session Token!",
            token: result.token,
            status: "success",
          });
        }
      }
    });
  }
};

const tryLogin = (req, res) => {
  console.log(`User Session ID: ${req.session.id}`);
  console.log(req.body);

  // if already logged in
  Token.findOne({ token: req.session.id }, (err, result) => {
    if (err) {
      console.error("Error in checking token in DB");
    }
    if (result != null) {
      // Check if token expired
      let current_time = new Date().getTime();
      if (result.epxiry < current_time) {
        return res.json({
          msg: "Session Expired! Please Login Again!",
          status: "error",
        });
      } else {
        // Refresh Token Expiry
        let newTime = new Date().getTime() + 3600000;

        // Update document in DB
        Token.updateOne(result, { expiry: newTime }, (err, tokenDB) => {
          if (err) {
            console.error("Cannot Update Token");
          }
        });

        return res.json({
          msg: "Valid Session Token!",
          token: result.token,
          status: "success",
        });
      }
    } else {
      // if not, then check if the credential is correct
      let id = req.body.username;
      let pw = req.body.password;

      User.findOne({ username: id, password: pw }, (err, result) => {
        if (err) {
          console.error("Error in checking credential in DB");
        }

        if (result != null) {
          // Create New Token For User
          let userToken = req.session.id;
          let expiryTime = new Date().getTime() + 3600000;

          let newToken = new Token({
            token: userToken,
            expiry: expiryTime,
          });

          // save token to db
          newToken.save((err, result) => {
            if (err) {
              console.error("Cannot Save Token");
            }
          });

          // save token to user's session
          req.session.token = userToken;

          return res.json({
            msg: "Login Success!",
            token: userToken,
            status: "success",
          });
        } else {
          return res.json({
            msg: "Incorrect Username and Password",
            status: "error",
          });
        }
      });
    }
  });
};

const createAccount = (req, res) => {
  let id = req.body.username;
  let pw = req.body.password;

  User.findOne({ username: id }, (err, result) => {
    if (err) {
      console.error("Error in checking credential in DB");
    }
    if (result != null) {
      return res.json({ msg: "Username Already Existed!", status: "error" });
    } else {
      let new_user = new User({
        username: id,
        password: pw,
      });

      new_user.save((err, result) => {
        if (err) {
          console.error("Cannot Create New User");
        }
        // Create New Token For User
        let userToken = req.session.id;
        let expiryTime = new Date().getTime() + 3600000;

        let newToken = new Token({
          token: userToken,
          expiry: expiryTime,
        });

        // save token to db
        newToken.save((err, result) => {
          if (err) {
            console.error("Cannot Save Token");
          }
        });

        // save token to user's session
        req.session.token = userToken;

        return res.json({
          msg: "Create User Success!",
          token: userToken,
          status: "success",
        });
      });
    }
  });
};

const sessionSecret = "0c4c8dcd-f724-40d7-a290-fb71d6cb77f1";
// Add session middle ware to the pipeline
app.use(
  session({ secret: sessionSecret, resave: true, saveUninitialized: true })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/api/auth/login", checkLogin);
app.post("/api/auth/login", (req, res) => tryLogin(req, res));
app.post("/api/auth/create", (req, res) => createAccount(req, res));

// Search Book API
app.get("/api/book/*", getBookByParms);

// Book Image Static Files
app.use("/api/static", express.static("static"));

app.listen(5000, runServer);
