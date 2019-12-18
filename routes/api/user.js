const express = require("express");
const router = express.Router();
const User = require("../../models/user");


//CRUD OPERATIONS
router.get("/", (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
});
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  User.findById(id)
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
});

router.post("/", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const mail = req.body.mail;
  const solde = 0;
  const commands = []
  newUser = new User({
    username,
    password,
    mail,
    solde,
    commands
  });
  newUser
    .save()
    .then(user => {
      //res.json(user);
      res.send({
        message: "User Added successfully",
        status: "success",
        user: user
      });
    })
    .catch(err => console.log(err));
});

router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  let user = User.findById(id)
    .then(user => {
      user.username = req.body.username;
      user.password = req.body.password;
      user.mail = req.body.mail;
      user
        .save()
        .then(user => {
          //res.json(user);
          res.send({
            message: "User Updated successfully",
            status: "success",
            user: user
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  User.findById(id)
    .then(user => {
      user
        .delete()
        .then(user => {
          //res.json(user);
          res.send({
            message: "User Deleted successfully",
            status: "success",
            user: user
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
