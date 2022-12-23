import client, { Polls, Votes } from "@dbClient";
import { ObjectId } from "mongodb";
const addVote = async ({ pollId, optionId, userId }) => {
  const option_id = new ObjectId(optionId);
  const poll_id = new ObjectId(pollId);

  try {
    await client.connect();

    // Validate if the option exist in the poll
    const poll = await Polls.findOne({
      $and: [
        {
          _id: poll_id,
        },
        {
          options: {
            $elemMatch: { _id: option_id },
          },
        },
      ],
    });


    if (poll) {
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


      // If the same vote shortcut function
      if (existingVote?.option_id.toString() === option_id.toString())
        return { success: false };


      const res = {
        newVote: optionId,
        oldVote: null,
        success: true,
      };

      await Votes.updateOne(
        {
          user_id: userId,
          poll_id,
        },
        {
          $set: {
            user_id: userId,
            poll_id,
            option_id,
          },
        },
        { upsert: true }
      );

      await Polls.updateOne(
        { _id: poll_id, options: { $elemMatch: { _id: option_id } } },
        {
          $inc: {
            "options.$.result": 1,
          },
        }
      );

      if (existingVote) {
        await Polls.updateOne(
          {
            _id: poll_id,
            options: { $elemMatch: { _id: existingVote.option_id } },
          },
          {
            $inc: {
              "options.$.result": -1,
            },
          }
        );
        res.oldVote = existingVote.option_id.toString();
      }

      return res;
    }

    return { success: false };
  } catch (e) {
    return { success: false };
  } finally {
    await client.close();
  }
};

export { addVote };
