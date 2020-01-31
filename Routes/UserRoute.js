const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");
//import User Model
const User =  require("../Model/User.model");
//import Validations
const {registerValidation, loginValidation} = require("../Validation");

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended:true}));

//Register POST request
router.post("/Register", async (req,res) => {
    //res.send("ok");
    console.log(req.body);
    //lets validate the data before we make a user
    const schema = joi.object({
        name: joi.string().min(4).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
    });
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //EMAIL EXITS OR NOT
    const emailExit = await User.findOne({email:req.body.email});
    if(emailExit) return res.status(400).send("Email Exits !!");

    //HASSHED PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //CREATE A NEW USER
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    });                                
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err){
        res.status(400).send(err);
    }
});

router.post("/Login", async (req,res) => {
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
    });
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //EMAIL EXITS OR NOT
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Email dosn't exits !!");

    //PASSWORD CHECKING
   // console.log(user.password);
    //console.log(req.body.password);
    //if(user.password === req.body.password) return res.status(400).send("Wrong password");
    const ValidPass = await bcrypt.compare(req.body.password, user.password);
    if(!ValidPass) return res.status(400).send("Wrong/Invalid  Password !!");

    //res.send("Logged In :)");

    //CREATE A TOKEN
    const token = jwt.sign({_id: user._id, name: user.name}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;