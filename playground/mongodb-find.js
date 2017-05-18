// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

var obj = new ObjectID();

console.log(obj);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
  return  console.log("Unable to connect to mongodb server");
  }

  console.log("Able to connect to mongodb server");

  // db.collection("ToDo").find({
  //   _id: new ObjectID("591e10def73b2b3996998722")
  // }).toArray().then((docs) => {
  //   console.log("ToDo");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log("Unable to fetch ToDo", err);
  // });

  // db.collection("ToDo").find().count().then((count) => {
  //   console.log(`ToDo Count: ${count}`);
  // }, (err) => {
  //   console.log("Unable to fetch ToDo count", err);
  // });

  db.collection("Users").find({name: "David"}).toArray().then((docs) => {
    console.log("Users");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("Unable to fetch Users", err);
  });


// db.close();
});
