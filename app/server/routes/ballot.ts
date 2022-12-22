import express from "express";
import client, { Polls } from "@dbClient";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    await client.connect();
    const insertRes = await Polls.insertOne(data);
    res.json(insertRes);
  } finally {
    client.close();
  }
});

export default router;
