import { createPoll, getPoll } from "./service";
const Query = {
  getPoll: async (__, { id }) => {
    return getPoll(id);
  },
};

const Mutation = {
  createPoll: async (__, { poll }) => {
    return createPoll(poll);
  },
};

export { Query, Mutation };
