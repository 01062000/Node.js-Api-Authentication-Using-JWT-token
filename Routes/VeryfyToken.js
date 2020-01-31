const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

module.exports = function (req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("ACCESS DENIED !!");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch {
        res.status(400).send("Invalid Token !!");
    }
}