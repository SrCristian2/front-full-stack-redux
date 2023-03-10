import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./PostSlice";

export const store = configureStore({
  reducer: {
    postStore:postReducer,
  },
  devTools:process.env.NODE_ENV !== "production"
});
