import { getUser } from "./services";
export const Query = {
  user: async () => {
    return getUser();
  },
};
