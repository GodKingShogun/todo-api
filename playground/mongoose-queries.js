const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/users');

// var id = '5925e4ffb7439068164de35b';
//
// if (!ObjectID.isValid(id)) {
//   console.log('Id is not valid ');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log(`Todos: ${todos}`);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log(`Todo: ${todo}`);
// });
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('id not found');
//   }
//   console.log(`Todo by id: ${todo}`);
// }).catch((e) => console.log(e));

var id = '5924b7f7beafff182baeddc1';

Users.findById(id).then((user) => {
  if (!user) {
    return console.log('id not found');
  }
  console.log(`User by id ${user}`);
}).catch((e) => console.log(e));
