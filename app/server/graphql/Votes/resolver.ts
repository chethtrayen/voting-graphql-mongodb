import { addVote } from "./services";

const Mutation = {
  addVote: async (_, { vote }, { uid }) => {
    return addVote({ ...vote, userId: uid });
  },
};

export { Mutation };
