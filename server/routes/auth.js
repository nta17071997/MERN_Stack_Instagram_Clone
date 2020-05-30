const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");

router.get('/', (req, res) =>{
    res.send("Hello");
});

router.post('/signup', (req, res) =>{
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        res.status(422).json({ error: 'Please add all the fields.' })
    } 

    User.findOne({email: email})
        .then(savedUser => {
            if(savedUser){
                return res.status(422).json({error: 'User already exists with that email.'});
            }
            const user = new User({
                name,
                email, 
                password
            });
            user.save()
                .then(user =>{
                    res.json({message: "Saved successfully"})
                })
                .catch(err =>{
                    console.log(err)
                })
        })
        .catch(err =>{
            console.log(err)
        });
});

module.exports = router;