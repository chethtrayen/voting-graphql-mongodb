import { configureStore } from "@reduxjs/toolkit";
import optionsReducer from "./features/poll/optionSlice";
import voteReducer from "./features/poll/voteSlice";

export default configureStore({
  reducer: { optionsReducer, voteReducer },
});
