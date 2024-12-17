const mongoose = require("mongoose");
const Chat = require("./Models/Chat.js");
main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const allChats = [
  {
    from: "Rahul",
    to: "Sonia",
    message: "Let's meet at the library at 5 PM.",
    createdAt: new Date(),
  },
  {
    from: "Amit",
    to: "Nisha",
    message: "Can you send me the assignment link?",
    createdAt: new Date(),
  },
  {
    from: "Kavya",
    to: "Vikram",
    message: "Don't forget to bring your ID card.",
    createdAt: new Date(),
  },
  {
    from: "Sneha",
    to: "Anjali",
    message: "Did you finish the project presentation?",
    createdAt: new Date(),
  },
  {
    from: "Rohan",
    to: "Deepak",
    message: "The meeting is postponed to tomorrow.",
    createdAt: new Date(),
  },
  {
    from: "Aarti",
    to: "Priya",
    message: "Can you pick me up at 7 PM?",
    createdAt: new Date(),
  },
  {
    from: "Manoj",
    to: "Kiran",
    message: "Did you see my email about the new tasks?",
    createdAt: new Date(),
  },
  {
    from: "Pooja",
    to: "Sameer",
    message: "Let’s revise together for the exam.",
    createdAt: new Date(),
  },
];

Chat.insertMany(allChats);
