import React from "react";
import "../styles/glass.css";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../features/blog/blogSlice";

const BlogCard = ({ blog, onEdit }) => {
  const dispatch = useDispatch();

  const imageUrl = blog.imagePath
    ? `${process.env.REACT_APP_BASE_URL}/${blog.imagePath}`
    : null;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <div className="glass-card">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="blog"
          style={{ width: "100%", borderRadius: "15px" }}
        />
      )}

      <h6 className="mt-2">{blog.location}</h6>
      <h4>{blog.title}</h4>
      <p>{blog.description}</p>

      <div className="d-flex gap-2">
        <button className="glass-btn" onClick={() => onEdit(blog)}>
          Edit
        </button>
        <button className="glass-btn" onClick={() => handleDelete(blog.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
