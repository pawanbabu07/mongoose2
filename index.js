const express= require("express");
const app=express();
const mongoose= require("mongoose");
const path=require("path");
const methodOverride=require("method-override");

const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("connection susscessful");
}).catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
} 

app.listen(8080,()=>{
    console.log("root is working");
});
//---------------------------------------------------
// let chat1 = new Chat({
//     from: "Neha",
//     to: "Pawan",
//     msg: "send me your exam sheets",
//     created_at: new Date(),
// })
// chat1.save().then((res)=>{
//     console.log(res);
// })

//Index Route
app.get("/chats", async(req,res)=>{
    let chats= await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
})

app.get("/",(req,res)=>{
    res.send("server is listioning on port 8080");
})
// create rout
app.post("/chats",(req,res)=>{
    let {from, to, msg}=req.body;
    let newChat= new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat
    .save()
    .then((res)=>{
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("chats");
});

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//Edit route

app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

// update Rout
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg: newMsg}=req.body;
    await Chat.findByIdAndUpdate(id,{msg: newMsg},{runValidators:true , new: true});
    res.redirect("/chats");
})

//Detrou Route
app.delete("/chats/:id", async (req,res)=>{
    let  {id}= req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});