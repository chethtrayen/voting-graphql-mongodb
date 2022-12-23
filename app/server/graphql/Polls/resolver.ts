import { createPoll, closePoll, getPoll } from "./services";
const Query = {
  poll: async (_, { id }, { uid }) => {
    return getPoll(id, uid);
  },
};

const Mutation = {
  createPoll: async (_, { poll }) => {
    return createPoll(poll);
  },

  closePoll: async (_, { id }) => {
    return closePoll(id);
  },
};

export { Query, Mutation };
