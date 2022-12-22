import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import config from "@config";

import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { Context } from "@type";

import bodyParser, { json } from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import path from "path";

import context from "./graphql/context";

import ballotRoutes from "./routes/ballot";
import userRoutes from "./routes/user";

const { port } = config;

const startGraphqlServer = async () => {
  // Merge and import schemas
  const typeDefArray = loadFilesSync(
    path.join(__dirname, "graphql/**/schema.graphql")
  );

  const typeDefs = mergeTypeDefs(typeDefArray);

  // Merge and import resolvers
  const resolverArray = loadFilesSync(
    path.join(__dirname, "graphql/**/resolver.ts")
  );
  const resolvers = mergeResolvers(resolverArray);

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<Context>({
    resolvers,
    typeDefs,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(bodyParser.json());

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context,
    })
  );

  app.use("/user", userRoutes);
  app.use("/ballot", ballotRoutes);

  await new Promise((resolve) => {
    httpServer.listen(port);
    resolve(null);
  });

  console.log(`Server ready on http://localhost:${port}/`);
};

startGraphqlServer();
