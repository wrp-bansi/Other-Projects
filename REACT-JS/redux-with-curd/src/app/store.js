import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "../featchers/userDeatailSlice";

export const store = configureStore({
  reducer: {
    app: userDetailReducer,
  },
});