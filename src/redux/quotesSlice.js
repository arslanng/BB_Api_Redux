import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllQuotes = createAsyncThunk(
  "quotes/fetchAll",
  async (page) => {
    const res = await axios(`https://api.quotable.io/quotes?page=${page}`);

    return res.data.results;
  }
);

export const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    items: [],
    status: "idle",
    page: 1,
    hasNextPage: true,
  },
  reducers: {},
  extraReducers: {
    [fetchAllQuotes.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchAllQuotes.fulfilled]: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.status = "succeeded";
      state.page += 1;
      if (action.payload.length < 20) {
        state.hasNextPage = false;
      }
    },
    [fetchAllQuotes.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    },
  },
});

export const quotesSelector = (state) => state.quotes.items;
export const statusSelector = (state) => state.quotes.status;
export const errorSelector = (state) => state.quotes.error;

export default quotesSlice.reducer;
