const express = require("express");
const router = express.Router();
//import User Model
const User =  require("../Model/User.model");
//import Validations
const {registerValidation, loginValidation} = require("../Validation");

//Register POST request
router.post("/Register", async (req,res) => {
    //res.send("ok");
    //lets validate the data before we make a user
   // const {error} = registerValidation(req.body);
    //if (error) return res.status(400).send(error.details[0].message);

    const user = new User(req.body);                                /* {
                                                                             name: req.body.name,
                                                                             email: req.body.email,
                                                                             password: req.body.password
                                                                        }
                                                                   */
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err){
        res.status(400).send(err);
    }
});

//Logedin POST request
/*router.post("/Register", async (req,res) => {
    const user = new User({
        name: req.body.name,
        name: req.body.email,
        name: req.body.password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err);
    }
});*/

module.exports = router;