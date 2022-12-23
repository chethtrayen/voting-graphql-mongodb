import client, { Polls, Votes } from "@dbClient";
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

    return insertRes.insertedId;
  } catch (e) {
    return false;
  } finally {
    await client.close();
  }
};

const getPoll = async (pollId, userId) => {
  try {
    await client.connect();

    const poll_id = new ObjectId(pollId);

    const poll = await Polls.findOne(poll_id);

    const existingVote = await Votes.findOne({
      $and: [
        {
          user_id: userId,
        },
        {
          poll_id,
        },
      ],
    });

    return { ...poll, userVote: existingVote?.option_id.toString() };
  } catch (e) {
    return false;
  } finally {
    await client.close();
  }
};

export { createPoll, getPoll };
