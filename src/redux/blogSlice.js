import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/blogs';

export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const createBlog = createAsyncThunk('blog/createBlog', async (newBlog) => {
  const response = await axios.post(API_URL, newBlog);
  return response.data;
});

export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; 
});

export const updateBlog = createAsyncThunk('blog/updateBlog', async (updatedBlog) => {
  const response = await axios.put(`${API_URL}/${updatedBlog.id}`, updatedBlog);
  return response.data;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    status: 'idle',
    searchQuery: '',
    categoryFilter: 'All',
    sortBy: 'latest'
  },
  reducers: {
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
    setCategoryFilter: (state, action) => { state.categoryFilter = action.payload; },
    setSortBy: (state, action) => { state.sortBy = action.payload; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state) => { state.status = 'failed'; })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
     
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      });
  },
});

export const { setSearchQuery, setCategoryFilter, setSortBy } = blogSlice.actions;
export default blogSlice.reducer;