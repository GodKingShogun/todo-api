const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

require('./config/config')

const {mongoose} = require("./db/mongoose");
const {Todo} = require('./models/todo');
const {Users} = require("./models/users");
const {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT;
var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
var todo = new Todo({
  text: req.body.text
});

todo.save().then((doc) => {
  res.send(doc);
}, (e) => {
  res.status(400).send(e);
});
});

app.post('/user', (req, res) => {
var body = _.pick(req.body, ['email', 'password']);
var user = new Users(body);

user.save().then(() => {
  return user.generateAuthToken();
}).then((token) => {
  res.header('x-auth', token).send(user);
}).catch((e) => {
  res.status(400).send(e);
});
});

app.get('/user/me', authenticate, (req, res) => {
res.send(req.user);
});

app.post('/user/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var email = body.email;
  var password = body.password;

Users.findByCredentials(email, password).then((user) => {
  return user.generateAuthToken().then((token) => {
    res.header('x-auth', token).send(user);
  });
  }).catch((e) => res.status(400).send());
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

Todo.findById(id).then((todo) => {
  if (!todo) {
    return res.status(404).send();
  }

  res.send({todo});
}).catch((e) => res.status(400).send());

});

app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => res.status(400).send());
});


app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

module.exports = {app};
