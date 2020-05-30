const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../key');
const requireLogin = require('../middleware/requireLogin');

router.get('/protected', requireLogin, (req, res) => {
  res.send("Hello user.")
})

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(422).json({ error: "Please add all the fields." });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exists with that email." });
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "Saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(422).json({error: "Please add email or password."})
    }
    User.findOne({email: email})
      .then(saveUser => {
        if(!saveUser){
          return res.status(422).json({error: "Invalid Email or password."});
        }
        bcrypt.compare(password, saveUser.password)
          .then(doMatch => {
            if(doMatch){
              //res.json({message: "Successfully signed in."});
              const token = jwt.sign({
                _id: saveUser._id
              }, JWT_SECRET);
              res.json({token});
            } else{
              return res.status(422).json({error: "Invalid email or password"});
            }
          })
          .catch(err => {
            console.log(err)
          });
      })
      .catch(err => {
        console.log(err)
      });
});

module.exports = router;