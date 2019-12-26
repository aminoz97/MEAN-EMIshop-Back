const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const auth = require("../../config/auth.js")
//CRUD OPERATIONS
router.post("/register", async (req, res) => {
  // Create a new user
  console.log(req.body);
  try {

    const username = req.body.username;
    const password = req.body.password;
    const mail = req.body.mail;
    const validity = await User.checkValidity(username, mail);
    if (validity !== "valid for registration") {
      res.status(400).send({
        message: "Registration Failed",
        status: "failed",
        reason: validity
      });
      return;
    }
    const solde = 0;
    const commands = [];
    const user = new User({
      username,
      password,
      mail,
      solde,
      commands
    });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({
      message: "Registred successfully",
      status: "success",
      user: user,
      token: token
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  //Login a registered user
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findByCredentials(username, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).send({
      message: "Login Success",
      status: "success",
      user: user._id,
      token: token
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = router;

/////////////////ADMIN FUNCTIONS//////////////////////

router.get("/", (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
});
router.get("/me",auth,(req,res)=>{
  res.send(req.user)
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


router.get("/:username", (req, res, next) => {
  let search = req.params.username;
  User.find({'username': search})
  .then(user => {
    res.json(user);
  })
  .catch(err => console.log(err));
});

router.get("/role/admin/:id", (req, res, next) => {
  let id = req.params.id;
  let user = User.findById(id)
    .then(user => {
      user.role = "admin";
      user.save()
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
router.get("/role/user/:id", (req, res, next) => {
  let id = req.params.id;
  let user = User.findById(id)
    .then(user => {
      user.role = "user";
      user.save()
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

router.get("/token/:tok", (req, res, next) => {
  let search = req.params.tok;
  User.findOne({$text: {$search: search}})
       .then(user => {
        res.json(user);
      })
      .catch(err => console.log(err));
});

module.exports = router;
