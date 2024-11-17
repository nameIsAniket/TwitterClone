import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { User } from './user';
import bodyParser from "body-parser"

export async function initServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  const server = new ApolloServer({
    typeDefs: `
      ${User.types}
      type Query {
        ${User.queries}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
    },
  });

  // Start the server
  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server),
  );

  return app;
}
