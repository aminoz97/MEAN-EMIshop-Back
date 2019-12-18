const mongoose = require("mongoose");

const userSchema = require("./user");
const productSchema = require("./product");

let Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const commandeSchema = new Schema({
  user: { type: ObjectId, ref: "user" },
  date: {
    type: String,
    require: true
  },
  total: {
    type: Number,
    require: true
  },
  products: [{ type: ObjectId, ref: "product" }],
  quantity:[Number]
});
module.exports = mongoose.model("Command", commandeSchema);
