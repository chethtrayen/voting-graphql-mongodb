import { getUser } from "./service";
export default {
  Query: {
    user: async () => {
      return getUser();
    },
  },
};
