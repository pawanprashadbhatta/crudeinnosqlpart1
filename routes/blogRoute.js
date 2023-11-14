const { renderCreateBlog, createBlog, renderEditBlog, editBlog, allBlogs, deleteBlog, singleBlog } = require("../controller/blog/blogController")

const router=require("express").Router()
router.route("/createBlog").get(renderCreateBlog).post(createBlog)
router.route("/editBlog/:id").get(renderEditBlog).post(editBlog)
router.route("/").get(allBlogs)
router.route("/delete/:id").get(deleteBlog)
router.route("/single/:id").get(singleBlog)
module.exports=router