const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
// const cookieParser = require("cookie-parser");

// internal imports
const loginRouter = require("./routes/loginRouter");
const usersRouter = require("./routes/userRouter");


const app = express();
const server = http.createServer(app);
dotenv.config();

var cors = require('cors');
app.use(cors({
  credentials: true,
  origin: "http://192.168.40.15:19002",
}));

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
// app.use(cookieParser(process.env.COOKIE_SECRET));

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to together express application." });
// });

// routing setup
app.use("/login", loginRouter);
app.use("/users", usersRouter);

server.listen(process.env.PORT, () => {
    console.log(`app listening to port ${process.env.PORT}`);
  });