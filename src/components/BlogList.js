import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import BlogCard from "./BlogCard";
import AddEditModal from "./AddEditModal";
import bg from "../assets/bg2.jpg";

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blog);

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
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Your real UI */}
      <div className="container mt-3 ">
        {/* Top Left Button */}
        <span className="floating-btn" onClick={handleAdd}>
         +
        </span>

        {loading ? (
          <div className="row">
            {blogs.map((_, i) => (
              <div className="col-md-4 mb-3" key={i}>
                <div className="skeleton-card"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            {blogs.map((blog) => (
              <div className="col-md-4 col-sm-6 mb-3" key={blog.id}>
                <BlogCard blog={blog} onEdit={handleEdit} />
              </div>
            ))}
          </div>
        )}

        <AddEditModal
          show={show}
          handleClose={() => setShow(false)}
          editData={editData}
        />
      </div>
    </div>
  );
};

export default BlogList;
