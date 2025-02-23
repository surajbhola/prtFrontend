import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../config/api.config";


const getAuthHeaders = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`, 
  },
});


export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/post`, getAuthHeaders());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/post`,
        postData,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/post/${postId}`, getAuthHeaders());
      return postId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ postId, caption }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/post/${postId}`,
        { caption },
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: { posts: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) state.posts[index] = action.payload;
      });
  },
});

export default postSlice.reducer;
