import client, { Results } from "@dbClient";
import { ObjectId } from "mongodb";

export const getResult = async (pollId) => {
  try {
    await client.connect();
    const poll_id = new ObjectId(pollId);

    const [result] = await Results.aggregate([
      { $match: { poll_id } },
      { $unwind: "$options" },
      {
        $lookup: {
          from: "users",
          localField: "options.voters",
          foreignField: "_id",
          as: "options.voters",
        },
      },
      {
        $group: {
          _id: "$_id",
          options: {
            $push: {
              label: "$options.label",
              voters: "$options.voters.loginId",
              result: "$options.result",
            },
          },
          label: { $first: "$label" },
          poll_id: { $first: "$poll_id" },
        },
      },
    ])
      .limit(1)
      .toArray();

    return { ...result };
  } catch (e) {
    return false;
  } finally {
    await client.close();
  }
};
