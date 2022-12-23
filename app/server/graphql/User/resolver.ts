import { getUser } from "./services";
export default {
  Query: {
    user: async () => {
      return getUser();
    },
  },
};
