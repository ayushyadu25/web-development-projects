const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to: {
        type:String,       
         required:true
    },
    message: {
        type:String,
        maxLength: 50
    },
    created_at: {
        type:Date,
        required:true
    }
});
const chat = new mongoose.model("Chat",chatSchema) ;
module.exports = chat;