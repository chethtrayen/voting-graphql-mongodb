import { createSlice } from "@reduxjs/toolkit";

export const voteSlice = createSlice({
  name: "vote",
  initialState: {
    value: null,
  },
  reducers: {
    setVote: (state, vote) => {
      state.value = vote.payload;
    },
  },
});

export const { setVote } = voteSlice.actions;

export const selectVote = (state) => {
  return state.voteReducer.value;
};

export default voteSlice.reducer;
