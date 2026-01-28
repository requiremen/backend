const express = require("express");
const app = express();
const { todo } = require("./db");
const {createtodo, updatetodo} = require("./types");
const {create } = require("node:test");
const cors = require("cors");;
app.use(cors());
const jwt = require("jsonwebtoken");


app.use(express.json());
app.post("/todo", async function(req,res){
    const createPayload = req.body;
    const parsedPayload = createtodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).send({
            msg: "you sent the wrong inputs"
        })
    }
     await todo.create({
        id : createPayload.id,
        title : createPayload.title,
        description : createPayload.description,
        completed : false
    })
    res.json({
        msg : "created",
        
    })
})
app.get("/todos",async function(req,res){
    const todos =  await todo.find({});
    res.json({
        todos:todos
    })



})
app.put("/completed",  async function(req,res){
    const updatePayload = req.body;
    const parsedPayload = updatetodo.safeParse(updatePayload);
     if(!parsedPayload.success){
        res.status(411).send({
            msg : "you sent the worng inputs"
        })
        return;
     }
     await todo.update({
        _id : req.body.id
     },{
        completed : true
     })
     res.json({
        msg : "todo marked is completed"
     })
    


})
app.listen(3000, function(){
    console.log("sever is running on 3000");
})
