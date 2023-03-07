const mongoose = require("mongoose");

const  UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 25,
        unique: true
    },
    password: {
        type: Number,
        require: true,
        min: 6,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true,
        min: 50,
        max: 200
    },
    roomType: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model("user.model", UserSchema);