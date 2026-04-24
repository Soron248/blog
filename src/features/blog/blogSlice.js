import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBlogsAPI,
  createBlogAPI,
  updateBlogAPI,
  deleteBlogAPI,
} from "./blogApi";

export const fetchBlogs = createAsyncThunk("blog/fetch", async () => {
  const res = await fetchBlogsAPI();
  return res.data;
});

export const createBlog = createAsyncThunk("blog/create", async (data) => {
  const res = await createBlogAPI(data);
  return res.data;
});

export const updateBlog = createAsyncThunk(
  "blog/update",
  async ({ id, data }) => {
    const res = await updateBlogAPI(id, data);
    return res.data;
  },
);

export const deleteBlog = createAsyncThunk("blog/delete", async (id) => {
  await deleteBlogAPI(id);
  return id;
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH BLOGS
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false; // ✅ FIX
      })
      .addCase(fetchBlogs.rejected, (state) => {
        state.loading = false;
      })

      // CREATE
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) state.blogs[index] = action.payload;
      })

      // DELETE
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b.id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
