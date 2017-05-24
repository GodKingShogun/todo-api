const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require("./db/mongoose");
const {Todo} = require('./models/todo');
const {Users} = require("./models/users");

var app = express();

app.use(bodyParser.json());

app.post('/todo', (req, res) => {
var todo = new Todo({
  text: req.body.text
});

todo.save().then((doc) => {
  res.send(doc);
}, (e) => {
  res.status(400).send(e);
});
});

app.listen(3000, () => {
  console.log(`Connected to port 3000`);
});

module.exports = {app};
