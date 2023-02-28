import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  post: [],
  isLoading: false,
};

export const getPost = createAsyncThunk(
  "postSlice/getPost",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      //   dispatch(setLoading(true));
      const { data } = await axios.get(`/post`);
      //   dispatch(setLoading(false));
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const savePost = createAsyncThunk(
  "postSlice/savePost",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      await axios.post(`/post`, arg);

      dispatch(getPost());
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "postSlice/deletePost",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      //   dispatch(setLoading(true));
      await axios.delete(`/post/${id}`);
      //   dispatch(setLoading(false));
      dispatch(getPost());
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "postSlice/updatePost",
  async (arg, { dispatch, rejetcWithValue }) => {
    try {
      await axios.put(`/post/${arg._id}`, arg);

      dispatch(getPost());
    } catch (error) {
      return rejetcWithValue(error.response.message);
    }
  }
);

const PostSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },

  //getposts
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getPost.fulfilled, (state, action) => {
      state.post = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getPost.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    //savepost

    builder.addCase(savePost.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(savePost.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(savePost.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      alert(action.payload)
    });

    //deletepost

    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    //updatepost

    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
  },
});

export const { setLoading } = PostSlice.actions;

export default PostSlice.reducer;
