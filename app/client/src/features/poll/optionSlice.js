import { createSlice } from "@reduxjs/toolkit";

export const optionsSlice = createSlice({
  name: "options",
  initialState: {
    value: [],
  },
  reducers: {
    updateOptions: (state, votes) => {
      const updated = state.value.map((e) => {
        if (votes.payload.oldVote === e._id) {
          e.result--;
        } else if (votes.payload.newVote === e._id) {
          e.result++;
        }

        return e;
      });

      state.value = updated;
    },
    setOptions: (state, options) => {
      state.value = options.payload;
    },
  },
});

export const { updateOptions, setOptions } = optionsSlice.actions;

export const selectOptions = (state) => {
  return state.optionsReducer.value;
};
export default optionsSlice.reducer;
