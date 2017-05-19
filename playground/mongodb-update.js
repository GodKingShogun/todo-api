// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

var obj = new ObjectID();

console.log(obj);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
  return  console.log("Unable to connect to mongodb server");
  }

  console.log("Able to connect to mongodb server");

// db.collection("ToDo").findOneAndUpdate({
//   _id: new ObjectID('591e2df2f73b2b3996998bd5')
// }, {
//   $set: {
//     completed: true
//   }
// }, {
//   returnOriginal: false
// }).then((res) => {
//   console.log(res);
// });

db.collection("Users").findOneAndUpdate({
  _id: new ObjectID("591d18d79e1abe02387bbeaf")
}, {
  $set: {
    name: "David"
  },
  $inc: {
    age: 1
  }
}, {
  returnOriginal: false
}).then((res) => {
  console.log(res);
});

// db.close();
});
