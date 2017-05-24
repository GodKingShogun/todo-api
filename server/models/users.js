const mongoose = require('mongoose');

var Users = mongoose.model('Users', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {Users};