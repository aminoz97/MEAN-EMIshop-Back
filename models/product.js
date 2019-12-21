const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  picUrl: {
    type: String,
    require: true
  },
  categorie: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  like:{
    type: Number,
    require: true
  },
  dislike:{
    type: Number,
    require: true
  }
});

module.exports = mongoose.model("Product", productSchema);
