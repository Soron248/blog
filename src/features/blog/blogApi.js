import axiosInstance from "../../utils/axiosInstance";

export const fetchBlogsAPI = () => axiosInstance.get("/api/Blog");

export const createBlogAPI = (data) => {
  return axiosInstance.post("/api/Blog", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateBlogAPI = (id, data) => {
  return axiosInstance.put(`/api/Blog/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteBlogAPI = (id) =>
  axiosInstance.delete(`/api/Blog/${id}`);