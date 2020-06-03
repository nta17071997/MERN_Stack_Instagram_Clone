const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    pic: {type: String, default: "https://res.cloudinary.com/nguyenthanhan/image/upload/v1591158729/17797_lvfrcb.svg"},
    followers: [{type: ObjectId, ref: "User"}],
    following: [{type: ObjectId, ref: "User"}]
});

mongoose.model("User", userSchema);
