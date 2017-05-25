const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/users');

// Todo.remove({}).then((res) => {
//   console.log(res);
// });

Todo.findOneAndRemove({
  _id: new ObjectID('5927558c0cfc7a22c72c1e1c')
}).then((todo) => console.log(todo));
