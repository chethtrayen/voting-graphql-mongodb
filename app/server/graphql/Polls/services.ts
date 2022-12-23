import client, { Polls, Results, Votes } from "@dbClient";
import { ObjectId } from "mongodb";

export const closePoll = async (id) => {
  try {
    await client.connect();
    const poll_id = new ObjectId(id);
    const poll = await Polls.findOne(
      { _id: poll_id },
      { sort: { "options.result": 1 } }
    );

    poll.options = poll.options.sort((a, b) => b.result - a.result);

    // if (poll.closed) return { success: false };

    await Polls.updateOne(
      { _id: poll_id },
      {
        $set: {
          closed: true,
        },
      }
    );

    const votes = await Votes.aggregate([
      {
        $match: {
          poll_id,
        },
      },
      {
        $group: {
          _id: { option_id: "$option_id", poll_id: "$poll_id" },
          voters: { $addToSet: "$user_id" },
        },
      },
    ]).toArray();

    const resultOption = poll.options.map((o) => {
      let voters = [];
      const res = votes.find(
        (v) => v._id.option_id.toString() === o._id.toString()
      );

      if (res) voters = res.voters;

      delete o._id;

      return { ...o, voters };
    });

    const resultsData = {
      poll_id,
      options: resultOption,
      label: poll.label,
    };

    const insertRes = await Results.insertOne(resultsData);

    return {
      ...resultsData,
      success: true,
      _id: insertRes.insertedId,
    };
  } catch (e) {
    return { success: false };
  } finally {
    await client.close();
  }
};

export const createPoll = async (poll) => {
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

export const getPoll = async (pollId, userId) => {
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
