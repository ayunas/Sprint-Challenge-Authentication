const axios = require("axios");
const bcrypt = require("bcryptjs");
const dbHelper = require("../database/dbHelper");
// const db = require("../database/dbConfig");

const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  // server.get('/api/jokes', authenticate, getJokes);
  server.get("/api/jokes", authenticate, getJokes);
  server.get("/api/users", getUsers);
};

function register(req, res) {
  const newUser = req.body;
  const hash = bcrypt.hashSync(req.body.password, 10);
  newUser.password = hash;

  dbHelper
    .register(newUser)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
}

function login(req, res) {
  const user = req.body;

  dbHelper.login(user);
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
