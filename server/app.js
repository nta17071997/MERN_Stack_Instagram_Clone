const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

const {MONGOURI} = require('./config/key');

require('./models/user');
require('./models/post');

app.use(cors());
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
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