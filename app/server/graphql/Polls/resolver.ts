import { createPoll, closePoll, getPoll } from "./services";
export const Query = {
  poll: async (_, { id }, { uid }) => {
    return getPoll(id, uid);
  },
};

export const Mutation = {
  createPoll: async (_, { poll }) => {
    return createPoll(poll);
  },

  closePoll: async (_, { id }) => {
    return closePoll(id);
  },
};
