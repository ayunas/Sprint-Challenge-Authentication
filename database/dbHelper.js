const db = require("./dbConfig");

module.exports = {
  register: register,
  getUsers: getUsers,
  login: login
};

function register(newUser) {
  return db("users").insert(newUser);
}

function login(username) {
  console.log(username);
  return db("users")
    .where({ username: username })
    .first()
}

function getUsers() {
  return db("users").select("*");
}

