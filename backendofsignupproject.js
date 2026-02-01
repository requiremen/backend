const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const {Putsign} = require("./db")
const {signup} = require("./types")
app.post("/signup",  async function(req,res){
    const databhejo = req.body;
    const datadallo = signup.safeParse(databhejo)
    if(!datadallo.success){
        res.status(400).send({
            msg : "data not sent"

        })
        return;

    }await Putsign.create({
        username:datadallo.data.username,
        password:datadallo.data.password


    })
    res.json({
        msg:"data senttt yay"
    })
        
    
})
app.listen(3000,function(){
    console.log("running")
})
