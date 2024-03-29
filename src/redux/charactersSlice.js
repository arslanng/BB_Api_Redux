import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const char_limit = 12; // kaç karakter çekileceğini belirler

export const fetchCharacters = createAsyncThunk(
  "characters/getCharacters",
  async (page) => {
    const res = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/characters`
    );
    return res.data.slice(page * char_limit, page * char_limit + char_limit);
  }
);

export const charactersSlice = createSlice({
  name: "character",
  initialState: {
    items: [],
    status: "idle", // isLoading yerine status tanımı girildi. Başlangıç konumu "idle"
    page: 0,
    hasNextPage: true,
  },
  reducers: {},
  extraReducers: {
    [fetchCharacters.pending]: (state, action) => {
      state.status = "loading"; //
    },
    [fetchCharacters.fulfilled]: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.status = "succeeded"; //
      state.page += 1;

      if (action.payload.length < char_limit) {
        state.hasNextPage = false;
      }
    },
    [fetchCharacters.rejected]: (state, action) => {
      state.status = "failed"; //
      state.error = action.error.message;
    },
  },
});

export default charactersSlice.reducer;
