const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT , { useNewUrlParser: true } , (error) => {
    if(!error)
    {
        console.log("Successfully connected to mongodb");
    }
    else
    {
        console.log("can't connect to mongodb");
    }
});