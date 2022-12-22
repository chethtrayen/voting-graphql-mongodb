import express from "express";
import client, { Users } from "@dbClient";

const router = express.Router();

router.get("/create", async (_, res) => {
  try {
    await client.connect();

    let user = await Users.insertOne({
      loginId: "test",
      password: "password",
    });

    res.json({ success: true, ...user });
  } catch (e) {
    res.json({ success: false });
  } finally {
    await client.close();
  }
});

export default router;
