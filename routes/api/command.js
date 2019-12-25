const express = require("express");
const router = express.Router();
const Command = require("../../models/command");
const Product = require("../../models/product");


//CRUD OPERATIONS
router.get("/", (req, res, next) => {
  Command.find()
    .then(carts => {
      res.json(carts);
    })
    .catch(err => console.log(err));
});
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Command.findById(id)
    .then(Command => {
      res.json(Command);
    })
    .catch(err => console.log(err));
});
router.get("/:idUser", (req, res, next) => {
  let id = req.params.idUser;
  Command.findById(id)
    .then(Command => {
      res.json(Command);
    })
    .catch(err => console.log(err));
});

router.post("/", (req, res, next) => {
  const user = req.body.user;
  const total = req.body.total;
  const products = req.body.products;
  const quantity = req.body.quantity;
  //Calcul DAte
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  const date =  dd + '/' + mm + '/' + yyyy;
  newCart = new Command({
    user,
    date,
    total,
    products,
    quantity
  });
  newCart
    .save()
    .then(Command => {
      //res.json(Command);
      res.send({
        message: "Command Added successfully",
        status: "success",
        Command: Command
      });
    })
    .catch(err => console.log(err));
});

router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  let Command = Command.findById(id)
    .then(Command => {
      Command.user = req.body.user;
      Command.date = req.body.date;
      Command.total = req.body.total;
      Command.products = req.body.products;
      Command.quantity = req.body.quantity;
      Command
        .save()
        .then(Command => {
          //res.json(Command);
          res.send({
            message: "Command Updated successfully",
            status: "success",
            Command: Command
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  Command.findById(id)
    .then(Command => {
      Command
        .delete()
        .then(Command => {
          //res.json(Command);
          res.send({
            message: "Command Deleted successfully",
            status: "success",
            Command: Command
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});


//////////////REACHERCHE//////////////// ID COMPLET ////////////////

router.get("/user/:id", (req, res, next) => {
  let search = req.params.id;
  Command.find({'user': search})
  .then(Command => {
    res.json(Command);
  })
  .catch(err => console.log(err));
});

/////////////////////////////////////////////////////////////////////

module.exports = router;
