const User = require("../models/user");


async function displaySignup(req, res) {
    res.render("signup");
}

async function createUser(req, res) {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });

    return res.redirect("signin");
}

async function displaySignin(req, res) {
   res.render("signin");
}

async function signinAndGenerateToken(req, res) {
    const { email, password } = req.body;

    try {
        const token = User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect("/");
    }
    catch(error) {
        return res.render("signin", {
            error: "Incorrect Email or Password"
        });
    }
}

async function logout(req, res){
    res.clearCookie("token").redirect("/");
}


module.exports = { displaySignup, createUser, displaySignin, signinAndGenerateToken, logout };