const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Users} = require('./../../models/users');
const {Todo} = require('./../../models/todo');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'amanzedavid@example.com',
    password: 'userOnePass',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({_id: userOneId.toHexString(), access: 'auth'}, 'abc123').toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'andrew@example.com',
    password: 'userTwoPass'
  }
]

const todos = [{
  _id: new ObjectID,
  text: "First test to do"
},
{
  _id: new ObjectID,
  text: "Second test to do",
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
  return Todo.insertMany(todos);
}).then(() => done());
};

const populateUsers = (done) => {
  Users.remove({}).then(() => {
    var userOne = new Users(users[0]).save();
    var userTwo = new Users(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
