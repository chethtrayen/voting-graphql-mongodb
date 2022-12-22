import client, { Polls } from "@dbClient";
import { ObjectId } from "mongodb";

const createPoll = async (poll) => {
  try {
    await client.connect();
    poll.options = poll.options.map((label) => ({
      _id: new ObjectId(),
      label,
      result: 0,
    }));

    const insertRes = await Polls.insertOne(poll);

    console.log(insertRes);
    return insertRes.insertedId;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    await client.close();
  }
};

const getPoll = async (id) => {
  try {
    await client.connect();

    const poll = await Polls.findOne(new ObjectId(id));
    return poll;
  } catch (e) {
    return false;
  } finally {
    await client.close();
  }
};

export { createPoll, getPoll };
