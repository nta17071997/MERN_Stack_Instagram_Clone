const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../key");
const requireLogin = require("../middleware/requireLogin");

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

//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

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: "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"
  }
}))

router.get("/protected", requireLogin, (req, res) => {
  res.send("Hello user.");
});

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please add all the fields." });
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
          pic
        });
        user
          .save()
          .then((user) => {
            transporter.sendMail({
              to: user.email,
              from: "nguyenthanhan.binhminh@gmail.com",
              subject: "signup success",
              html: "<h1>Wellcome to instagram</h1>"
            })
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
  const { email, password, followers, following, pic } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password." });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Email or password." });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            //res.json({message: "Successfully signed in."});
            const token = jwt.sign(
              {
                _id: savedUser._id,
              },
              JWT_SECRET
            );
            const { _id, name, email, followers, following, pic } = savedUser;
            res.json({
              token,
              user: { _id, name, email, followers, following, pic },
            });
          } else {
            return res.status(422).json({ error: "Invalid email or password" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/reset-password', (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if(err){
      console.log(err)
    }
    const token = buffer.toString('hex')
    User.findOne({email: req.body.email})
    .then(user => {
      if(!user){
        return res.status(422).json({error: "User don't exists with that email."}) 
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then(result => {
        transporter.sendMail({
          to:user.email,
          from: "nguyenthanhan.binhminh@gmail.com",
          subject: "password reset",
          html: `
          <p>Your requested for password reset</p>
          <h5>Click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
          `
        })
        res.json({message: "check your email"})
      })
    })
  })
})

router.post('/new-password',(req,res)=>{
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(user=>{
      if(!user){
          return res.status(422).json({error:"Try again session expired"})
      }
      bcrypt.hash(newPassword,12).then(hashedpassword=>{
         user.password = hashedpassword
         user.resetToken = undefined
         user.expireToken = undefined
         user.save().then((saveduser)=>{
             res.json({message:"password updated success"})
         })
      })
  }).catch(err=>{
      console.log(err)
  })
})

module.exports = router;
