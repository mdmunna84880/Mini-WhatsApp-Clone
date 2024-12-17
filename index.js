const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./Models/Chat.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// TODO Home Route
app.get("/", (req, res) => {
  res.send("Root is working now");
});

// TODO Index Route
app.get("/chats", async(req, res)=>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
});

// TODO new Route
app.get("/chats/new", (req, res)=>{
  res.render("new.ejs");
})

// TODO Create Route
app.post("/chats", (req, res)=>{
  let {from, message, to} = req.body;
  const newChat = new Chat({
    from: from,
    message: message,
    to: to,
    createdAt: new Date()
  });
  newChat
  .save()
  .then((res)=>{
    console.log("Chat was saved");
  })
  .catch((err)=>{
    console.log(err);
  });
  res.redirect("/chats");
})

// TODO Edit Route
app.get("/chats/:id/edit",  async (req, res)=>{
  let {id} = req.params;
  let chat =  await Chat.findById(id);
  res.render("edit.ejs", {chat});
})

// TODO Update DB
app.put("/chats/:id", (req, res)=>{
  let {id}= req.params;
  let {message: newMessage} = req.body;
  Chat.findByIdAndUpdate(id, {message: newMessage}, {runValidators: true, new: true})
  .then((data)=>{
    console.log(data);
    res.redirect("/chats");
  })
  .catch((err)=>{
    console.log(err);
  });
});

// TODO Delete Route
app.delete("/chats/:id", (req, res)=>{
  let {id} = req.params;
  Chat.findByIdAndDelete(id)
  .then((data)=>{
    console.log(data);
    res.redirect("/chats");
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.listen(8080, () => {
  console.log("Server is listening now");
});
