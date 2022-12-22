import { Context } from "@type";
import client, { Users } from "dbClient";

const context = async (): Promise<Context> => {
  try {
    await client.connect();

    const user = await Users.findOne({});

    return { uid: user._id };
  } finally {
    await client.close();
  }
};

export default context;
