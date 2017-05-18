// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

var obj = new ObjectID();

console.log(obj);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
  return  console.log("Unable to connect to mongodb server");
  }

  console.log("Able to connect to mongodb server");

// db.collection("ToDo").deleteMany({text: "Eat lunch"}).then((res) => {
//   console.log(res);
// });

// db.collection("ToDo").deleteOne({text: "Eat lunch"}).then((res) => {
//   console.log(res);
// });

// db.collection("ToDo").findOneAndDelete({completed: false}).then((res) => {
//   console.log(res);
// });
// 
// db.collection("Users").deleteMany({name: "David"}).then((res) => {
//   console.log(res);
// });

db.collection("Users").findOneAndDelete({_id: new ObjectID("591d0f15774bb3338810c951")}).then((res) => {
  console.log(res);
});
// db.close();
});
