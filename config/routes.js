const axios = require("axios");
const bcrypt = require("bcryptjs");
const dbHelper = require("../database/dbHelper");
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");

const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", authenticate, login);
  // server.get('/api/jokes', authenticate, getJokes);
  server.get("/api/jokes", authenticate, getJokes);
  server.get("/api/users", authenticate, getUsers);
};

function register(req, res) {
  const newUser = req.body;
  const hash = bcrypt.hashSync(req.body.password, 10);
  newUser.password = hash;

  dbHelper
    .register(newUser)
    .then(id => {
      // const token = generateToken(response)
      console.log("userid", id);
      db("users").where({ id: id[0] }).first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ user: user.username, token: token });
        })
        .catch(err => {
          res.status(500).json(err.message);
        })
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
}

function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // db("users")
  //   .where({ username: username })
  //   .first()
  //   .then(user => {
  //     if (user && bcrypt.compareSync(password, user.password)) {
  //       const token = generateToken(user);
  //       res.status(200).json({ message: `Welcome ${user.username}`, token: token });
  //     }

  //   })
  //   .catch(err => {
  //     res.status(500).json(err.message);
  //   });

  dbHelper
    .login(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}`, token: token });
      } else {
        res
          .status(404)
          .json({ message: `${user.username} not found in the database` });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}

function getUsers(req, res) {
  dbHelper
    .getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
}

function generateToken(user) {

  const payload = {
    subject: user.id,
    username: user.username
  }

  const secret = "the secret is the key to the kingdom"

  const options = {
    expiresIn: "1hr"
  }

  return jwt.sign(payload, secret, options)
}
