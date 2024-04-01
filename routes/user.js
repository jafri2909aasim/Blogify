const { Router } = require("express");
const { displaySignup, createUser, displaySignin, signinAndGenerateToken, logout } = require("../controllers/user");

const multer = require("multer");
const path = require("path");


const router = Router();

// storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/users/"));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });


router.get("/signup", displaySignup);

router.post("/signup", upload.single('profileImage'), createUser);

router.get("/signin", displaySignin);

router.post("/signin", signinAndGenerateToken);

router.get("/logout", logout);


module.exports = router;
