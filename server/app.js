const express = require("express");
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;

const {MONGOURI} = require('./key');

require('./models/user');

app.use(express.json());
app.use(require('./routes/auth'));

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

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});