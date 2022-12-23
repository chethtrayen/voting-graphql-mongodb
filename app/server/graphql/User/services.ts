import client, { Users } from "@dbClient";

export const getUser = async () => {
  try {
    await client.connect();

    const user = await Users.findOne({});
    return { success: true, ...user };
  } catch (e) {
    return { success: false };
  } finally {
    await client.close();
  }
};
