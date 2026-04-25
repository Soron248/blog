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
  const [expanded, setExpanded] = useState(false);

  const isLong = blog.description?.length > 80;

  // old img from local storage
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

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  return (
    <div>
      <div className="mainGlass mt-3">
        {/* place the location top right side of the card */}
        <h6
          className="glass-card d-flex align-items-center gap-1 ms-auto mb-1"
          style={{
            width: "fit-content",
            fontSize: "12px",
            padding: "2px 5px",
            backgroundColor: "rgba(255, 226, 226, 0.58)",
          }}
        >
          <IoLocationSharp color="red" />
          <span style={{ color: "black" }}>{blog.location}</span>
        </h6>

        {imageUrl && (
          <img
            src={blog.imagePath}
            alt="blog"
            loading="lazy"
            style={{ width: "100%", borderRadius: "15px", display: "block" }}
          />
        )}

        <div className="glass-card mt-1">
          <h6 style={{ fontWeight: "600" }}>{blog.title}</h6>

          <p style={{ color: "lightGray", fontSize: "13px" }}>
            {expanded || !isLong
              ? blog.description
              : `${blog.description.slice(0, 80)}...`}
            {isLong && (
              <span
                onClick={() => setExpanded(!expanded)}
                style={{
                  color: "whiteSmoke",
                  cursor: "pointer",
                  fontSize: "11px",
                  marginLeft: "4px",
                }}
              >
                {expanded ? " show less" : " read more"}
              </span>
            )}
          </p>
          <span
            className="d-flex align-items-center ms-auto"
            style={{
              width: "fit-content",
              fontSize: "11px",
              color: "whiteSmoke",
            }}
          >
            {formatDate(blog.createdAt)}
          </span>
        </div>

        <div className="d-flex gap-2 mt-1">
          <span
            className="glass-btn1 d-flex align-items-center justify-content-center"
            onClick={() => onEdit(blog)}
          >
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
              <button
                className="glass-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button className="glass-delete" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
