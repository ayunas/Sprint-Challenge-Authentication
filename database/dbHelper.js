const db = require("./dbConfig");

module.exports = {
  register: register,
  getUsers: getUsers,
  login: login
};

function register(newUser) {
  return db("users").insert(newUser);
}

function login(user) {
  db("users").where({ username: user.username });
}

function getUsers() {
  return db("users").select("*");
}
