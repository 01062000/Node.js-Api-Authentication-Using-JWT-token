const express = require("express");
const app = express();
//Connection to DB
const db = require("./connection");

//Route Middlewears
app.use("/api/user", require("./Routes/UserRoute"));

app.use(express.json());

PORT = process.env.PORT || 5000;
app.listen(PORT, (req,res) => console.log(`Server started on port ${PORT}`));