const Blog = require("../models/blog");
const Comment = require("../models/comment");


async function addBlog(req, res) {
    res.render("addblog", {
        user: req.user
    });
}

async function saveBlog(req, res) {
    const { title, body } = req.body;

    const blog = await Blog.create({
        title,
        body,
        createBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`);
}

async function viewBlog(req, res){
    const blog = await  Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");

    return res.render("blog", {
        user: req.user,
        blog,
        comments
    });
}

async function blogComment(req, res){
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    });

    return res.redirect(`/blog/${req.params.blogId}`);
}


module.exports = { addBlog, saveBlog, viewBlog, blogComment };