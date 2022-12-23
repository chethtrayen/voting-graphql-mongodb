import { MongoClient } from "mongodb";
import config from "@config";

const client = new MongoClient(config.databaseUrl);

const database = client.db("voting");

export const Users = database.collection("users");
export const Polls = database.collection("polls");
export const Votes = database.collection("votes");
export const Results = database.collection("results");

export default client;
