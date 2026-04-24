import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import BlogCard from "./BlogCard";
import AddEditModal from "./AddEditModal";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleAdd = () => {
    setEditData(null);
    setShow(true);
  };

  const handleEdit = (blog) => {
    setEditData(blog);
    setShow(true);
  };

  return (
    <div className="container mt-3">

      {/* Top Left Button */}
      <button className="glass-btn mb-3" onClick={handleAdd}>
        + Add Post
      </button>

      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4 col-sm-6 mb-3" key={blog.id}>
            <BlogCard blog={blog} onEdit={handleEdit} />
          </div>
        ))}
      </div>

      <AddEditModal
        show={show}
        handleClose={() => setShow(false)}
        editData={editData}
      />
    </div>
  );
};

export default BlogList;