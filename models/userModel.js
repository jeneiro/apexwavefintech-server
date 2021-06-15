const mongoose = require("mongoose");
const userSchema =  new mongoose.Schema({
 email : {type: String, required: true},
 username : {type: String, required: true},
 passwordHash : {type: String, required: true},
 status: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
isAdmin: Boolean
});

 const User = mongoose.model("user", userSchema);
 module.exports = User;