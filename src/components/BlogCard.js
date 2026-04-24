import React, { useState } from "react";
import "../styles/glass.css";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../features/blog/blogSlice";
import { IoLocationSharp } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const BlogCard = ({ blog, onEdit }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const imageUrl = blog.imagePath
    ? `${process.env.REACT_APP_BASE_URL}/${blog.imagePath}`
    : null;

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteBlog(selectedId));
    setShowDeleteModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = { day: "2-digit", month: "short", year: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <>
      <div className="mainGlass">
        {/* place the location top right side of the card */}
        <h6
          className="glass-card d-flex align-items-center gap-1 ms-auto mb-1"
          style={{ width: "fit-content" }}
        >
          <IoLocationSharp />
          {blog.location}
        </h6>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="blog"
            style={{ width: "100%", borderRadius: "15px",boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)" }}
          />
        )}

        <div className="glass-card mt-1">
          <h4 style={{ fontWeight: "600" }}>{blog.title}</h4>

          <p style={{ color: "lightGray" }}>{blog.description}</p>

          <span
            className="d-flex align-items-center ms-auto"
            style={{ width: "fit-content", fontSize: "11px" }}
          >
            {formatDate(blog.createdAt)}
          </span>
        </div>

        <div className="d-flex gap-2 mt-1">
          <span className="glass-btn1 d-flex align-items-center justify-content-center" onClick={() => onEdit(blog)}>
            <MdModeEdit size={20} />
          </span>
          <span
            className="glass-btn2 d-flex align-items-center justify-content-center"
            onClick={() => handleDeleteClick(blog.id)}
          >
            <MdDeleteForever size={20} />
          </span>
        </div>
      </div>

{showDeleteModal && (
  <div className="glass-overlay">
    <div className="glass-popup">
      <p>Are you sure you want to delete?</p>

      <div className="glass-actions">
        <button className="glass-cancel" onClick={() => setShowDeleteModal(false)}>
          Cancel
        </button>

        <button className="glass-delete" onClick={confirmDelete}>
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default BlogCard;
