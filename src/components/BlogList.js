import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blog/blogSlice";
import BlogCard from "./BlogCard";
import AddEditModal from "./AddEditModal";
import bg from "../assets/bg2.jpg";
import MasonryGrid from "./MasonryGrid";
import Masonry from "react-masonry-css";

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

  const breakpointColumns = {
    default: 5,
    1100: 4,
    768: 3,
    500: 2,
    300: 1,
  };

  return (
    <>
      {/* ✅ BACKGROUND LAYER */}
      <div
        className="bg-layer"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      {/* ✅ MAIN CONTENT (SCROLLABLE) */}
      <div className="app-content">
        <div className="container py-3">
          {/* Floating Button */}
          <span className="floating-btn" onClick={handleAdd}>
            +
          </span>

          {loading ? (
            <div className="row">
              {[...Array(6)].map((_, i) => (
                <div className="col-md-3 mb-3" key={i}>
                  <div className="skeleton-card"></div>
                </div>
              ))}
            </div>
          ) : (
            <Masonry
              breakpointCols={breakpointColumns}
              className="masonry-grid"
              columnClassName="masonry-column"
            >
              {blogs?.map((blog) => (
                <BlogCard key={blog.id} blog={blog} onEdit={handleEdit} />
              ))}
            </Masonry>
          )}
        </div>

        <AddEditModal
          show={show}
          handleClose={() => setShow(false)}
          editData={editData}
        />
      </div>
    </>
  );
};

export default BlogList;
