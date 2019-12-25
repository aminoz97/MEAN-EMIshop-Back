const express = require("express");
const router = express.Router();
const Product = require("../../models/product");


//CRUD OPERATIONS
router.get("/", (req, res, next) => {
    Product.find()
      .then(products => {
        res.json(products);
      })
      .catch(err => console.log(err));
  });
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Product.findById(id)
    .then(product => {
      res.json(product);
    })
    .catch(err => console.log(err));
});

router.post("/", (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const picUrl = req.body.picUrl;
  const categorie = req.body.categorie;
  const price = req.body.price;
  const like = 0;
  const dislike = 0;
  newProduct = new Product({
    title,
    description,
    picUrl,
    categorie,
    price,
    like,
    dislike
  });
  newProduct
    .save()
    .then(product => {
      //res.json(product);
      res.send({
        message: "Product Added successfully",
        status: "success",
        product: product
      });
    })
    .catch(err => console.log(err));
});

router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  let product = Product.findById(id)
    .then(product => {
      product.title = req.body.title;
      product.picUrl = req.body.picUrl;
      product.description = req.body.description;
      product.categorie = req.body.categorie;
      product.price = req.body.price;
      product.like = req.body.like;
      product.dislike = req.body.dislike;
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
});

router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  Product.findById(id)
    .then(product => {
      product
        .delete()
        .then(product => {
          //res.json(product);
          res.send({
            message: "Product Deleted successfully",
            status: "success",
            product: product
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

//SPECIAL OPERATIONS
//Like
router.get("/like/:id", (req, res, next) => {
  let id = req.params.id;
  let product = Product.findById(id)
    .then(product => {
      product.like = product.like + 1;
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
});
//Dislike
router.get("/dislike/:id", (req, res, next) => {
  let id = req.params.id;
  let product = Product.findById(id)
    .then(product => {
      product.dislike = product.dislike + 1;
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
});



//////////////REACHERCHE//////////////// MOT COMPLET ////////////////

router.get("/search/:text", (req, res, next) => {
  let search = req.params.text;
  Product.find({$text: {$search: search}})
       .then(product => {
        res.json(product);
      })
      .catch(err => console.log(err));
});

/////////////////////////////////////////////////////////////////////

module.exports = router;
