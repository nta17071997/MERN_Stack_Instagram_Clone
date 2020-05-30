const express = require("express");
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;

const {MONGOURI} = require('./key');

require('./models/user');

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
    }, function(err){
    if(err){
        console.log(`Mongodb connected error: ${err}`)
    } else{
        console.log("Mongodb connected successfuly!");
    }
});

app.get('/', (req, res) => {
    console.log("home");
    res.send("Hello world.");
});

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});