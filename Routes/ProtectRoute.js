const router = require("express").Router();
const Veryfy = require("../Routes/VeryfyToken");

router.get("/PrivateRoute" ,Veryfy, (req,res) => {
    res.json({Posts: {
            Auther : "Rohit",
            description : "RestApi"
         }
    });
});

module.exports = router;