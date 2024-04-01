require('dotenv').config(); // import PORT
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const { checkCookieAuthentication } = require("./middlewares/authentication");
const Blog = require("./models/blog");

const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

const app = express();
PORT = process.env.PORT || 3000;


// db connection
mongoose.connect(process.env.MONGO_URL).then((e) => {
    console.log("mongodb connected");
}).catch((e) => {
    console.log("error while connecting mongodb");
});


// middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(checkCookieAuthentication("token"));
app.use(express.static(path.resolve("./public"))); // middleware to tell server that u can use static file/folder


// routes
app.get("/", async (req, res) => {
    let allBlogs = await Blog.find({});

    res.render("home", {
        user: req.user,
        blogs: allBlogs
    });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);


// port listening
app.listen(PORT, (req, res) => {
    console.log(`server started at port ${PORT}`);
});