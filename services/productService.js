const express = require("express");
const Product = require("../../models/product");

function like(){
    let product = Product.findById(id)
    .then(product => {
      product.like = product.like+1;
      product
        .save()
        .then(product => {
          //res.json(product);
          res.send({
            message: "Product Updated successfully",
            status: "success",
            product: product
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

module.exports = like();