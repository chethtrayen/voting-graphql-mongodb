import { MongoClient } from "mongodb";
import config from "@config";

const client = new MongoClient(config.databaseUrl);

const database = client.db("voting");

const Users = database.collection("users");
const Polls = database.collection("polls");
const Votes = database.collection("votes");

export { Users, Polls, Votes };

export default client;
