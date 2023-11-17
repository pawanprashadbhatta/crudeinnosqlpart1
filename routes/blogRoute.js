const { renderCreateBlog, createBlog, renderEditBlog, editBlog, allBlogs, deleteBlog, singleBlog, renderMyBlog } = require("../controller/blog/blogController")
const { isAuthenticated } = require("../middleware/isAuthenticated")

const router=require("express").Router()
router.route("/createBlog").get(renderCreateBlog).post(isAuthenticated, createBlog)
router.route("/editBlog/:id").get(renderEditBlog).post(isAuthenticated,editBlog)
router.route("/").get(allBlogs)
router.route("/delete/:id").get(isAuthenticated,deleteBlog)
router.route("/single/:id").get(isAuthenticated,singleBlog)
router.route("/myBlog").get(isAuthenticated,renderMyBlog)
module.exports=router