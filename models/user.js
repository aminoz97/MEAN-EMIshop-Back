const mongoose = require("mongoose");
const commandSchema = require("./command")

var Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  mail: {
    type: String,
    require: true
  },
  solde: Number,
  commands : [ commandSchema ]
});

module.exports = mongoose.model("User", userSchema);
