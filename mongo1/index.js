const express = require("express");
const app =express();
const path = require("path");
const mongoose = require("mongoose");
const { text } = require("stream/consumers");
const chat = require("./model/chat");
app.use(express.urlencoded({extended:true}));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

app.get("/chats",async(req,res)=>{
    let chats = await chat.find();
    
    res.render("index.ejs",{chats});
})

app.post("/chats",(req,res)=>{
    let {from,to,message}=req.body;
    let newChat = new chat({
        from:from,
        to:to,
        message:message,
        created_at:new Date()
    })
   newChat.save().then((res=>{
        console.log("chat was saved");
    })).catch(err =>{
    console.log(err)
})
    res.redirect("/chats");
})

app.get("/chats/:id/edit",async (req,res)=>{
    let {id}= req.params;
    let ch = await chat.findById(id);
    console.log(ch);
    res.render("edit.ejs",{ch});
})
app.put("/chats/:id",async (req,res)=>{
    let {id}= req.params;
    let {message : newMsg}=req.body;
    let updatedChat = await chat.findByIdAndUpdate(
        id,
        {message:newMsg,
            created_at:new Date()
        },
        { runValidators:true,new:true}
    )
    console.log(updatedChat);
    res.redirect("/chats");
})
app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedChat =await chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

// new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}



app.get("/",(req,res)=>{
    res.send("root is working");
})

app.listen(8080,()=>{
    console.log("server is listening");
})