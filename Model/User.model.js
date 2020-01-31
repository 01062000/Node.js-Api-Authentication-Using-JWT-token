const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : "required"
        /*min: 6,
        max: 255*/
    },
    email : {
        type : String,
        required : "required"
       /* min: 6,
        max: 255*/
    },
    password : {
        type: String,
        required : "required"
       /* min: 6,
        max: 1024*/
    },
    date : {
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("User", UserSchema);