const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
// bcrypt.hash(password, salt, (err, hash) => {
//   console.log(hash);
// });
// });


var hashP = "$2a$10$MrFDoM6RvV7oQDE5AFpkHufEz6xfvFvRe6B4Kh6ibdz4pNRls3ecO";
bcrypt.compare(password, hashP, (err, res) => {
  console.log(res);
});

// var data = {
//   id: 10
// }
//
// var token = jwt.sign(data, "123abc");
// console.log(token);
//
// var decoded = jwt.verify(token, "123abc");
// console.log("Decoded", decoded);

// var message = 'This is the example';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// }
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data)).toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + "some secret");
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed');
// }
