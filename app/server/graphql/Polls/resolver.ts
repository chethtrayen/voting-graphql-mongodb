import { createPoll, getPoll } from "./service";
const Query = {
  poll: async (__, { id }, { uid }) => {
    return getPoll(id, uid);
  },
};

const Mutation = {
  createPoll: async (__, { poll }) => {
    return createPoll(poll);
  },
};

export { Query, Mutation };
