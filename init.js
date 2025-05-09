const mongoose = require("mongoose");

const Chat = require("./models/chat.js");

main().then(()=>{
    console.log("connection susscessful");
}).catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
} 

let allChat=[
    {
        from: "pawan",
        to: "ayush",
        msg: "send me your exam sheets",
        created_at: new Date(),
    },

    {
        from: "swastik",
        to: "ayush",
        msg: "send me your exam sheets",
        created_at: new Date(),
    },

    {
        from: "swastik",
        to: "Pawan",
        msg: "send me your exam sheets",
        created_at: new Date(),
    },

    {
        from: "pawan",
        to: "pawan",
        msg: "send me your exam sheets",
        created_at: new Date(),
    },

    {
        from: "Neha",
        to: "ayush",
        msg: "send me your exam sheets",
        created_at: new Date(),
    },
];

Chat.insertMany(allChat);
