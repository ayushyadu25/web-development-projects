const mongoose = require('mongoose');

const chat = require("./model/chat.js");

let allChats = [
    {
        from:"neha",
        to:"preeti",
        message : "send me notes for the exam",
        created_at:new Date()
    },
    {
        from:"ayush",
        to:"naman",
        message : "let's play cricket",
        created_at:new Date()
    },
    {
        from:"rahul",
        to:"ramesh",
        message : "send me that photo",
        created_at:new Date()
    },
    {
        from:"hitesh",
        to:"lucky",
        message : "there is no college tomorrow",
        created_at:new Date()
    },
]

chat.insertMany(allChats)

main().then(()=>{
    console.log("connection successful");
})

.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

