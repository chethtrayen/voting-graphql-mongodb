import { getResult } from "./services";

export const Query = {
  result: (_, { pollId }) => {
    return getResult(pollId);
  },
};
