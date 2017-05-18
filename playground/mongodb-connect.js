// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

var obj = new ObjectID();

console.log(obj);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
  return  console.log("Unable to connect to mongodb server");
  }

  console.log("Able to connect to mongodb server");

  // db.collection("ToDo").insertOne({
  //   text: "Something to do",
  //   completed: false
  // }, (err, res) => {
  //   if (err) {
  //     return console.log("Unable to insert ToDo", err);
  //   }
  //
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });

// db.collection("Users").insertOne({
// name: "David",
// age: 20,
// location: "Georgia"
// }, (err,res)=> {
//   if (err) {
//     return console.log("Unable to insert users", err);
//   }
//   console.log(res.ops[0]._id.getTimestamp());
// });
//
//   db.close();
});
