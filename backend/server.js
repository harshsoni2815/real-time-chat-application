const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./confi/db");
const cors = require('cors');
const {registerUser, authUser} = require('./controller/userController');



dotenv.config();
connectDB();
const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server");
});

app.use("/api/user", userRoutes);
/* app.post("/api/user/",registerUser); */

app.get("/test", (req, res) => {
  res.send({
    name: "harsh",
    age: "25",
  });
});


app.listen(3000, () => {
  console.log("http://localhost:3000");
});

app.use((req,res,next)=>{
  const error = new Error(`Not Founds - ${req.originalUrl}`);
  res.status(404);
  next(error);
})

app.use((err,req,res,next)=>{
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  }); 
})


