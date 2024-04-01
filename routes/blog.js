const { Router } = require("express");
const { addBlog, saveBlog, viewBlog, blogComment } = require("../controllers/blog");

const multer = require("multer");
const path = require("path");


const router = Router();

// storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/uploads/"));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });


router.get("/addblog", addBlog);

router.post("/saveblog", upload.single('coverImage'), saveBlog);

router.get("/:id", viewBlog);

router.post("/comment/:blogId", blogComment);


module.exports = router;