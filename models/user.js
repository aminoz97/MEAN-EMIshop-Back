const mongoose = require("mongoose");
const commandSchema = require("./command");

const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    minLength: 4
  },
  mail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    }
  },
  solde: Number,
  role: String,
  commands: [commandSchema],
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username, /*mail,*/ password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ username });
  /*if (!user) {
    const user = await User.findOne({ mail} )
  }*/
  if (!user) {
    throw new Error({ error: "Invalid login !" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid password !" });
  }
  return user;
};

userSchema.statics.checkValidity = async (username, mail) => {
  // Search for a user by email and password.
  const user = await User.findOne({ username });
  const usermail = await User.findOne({ mail });
  if (!user) {
    if (usermail) {
      return "This mails is  already used";
    } else return "valid for registration";
  } else {
    return "This username already registred";
  }
};

userSchema.index({ "$**": "text" });

const User = mongoose.model("User", userSchema);

module.exports = User;
