// paginationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialPage = parseInt(localStorage.getItem("currentPage")) || 1;
const initialLimit = parseInt(localStorage.getItem("limit")) || 10;

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPage: initialPage,
    limit: initialLimit,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      localStorage.setItem("currentPage", action.payload);  // save to localStorage
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      localStorage.setItem("limit", action.payload);        // save to localStorage
    },
  },
});

export const { setCurrentPage, setLimit } = paginationSlice.actions;
export default paginationSlice.reducer;