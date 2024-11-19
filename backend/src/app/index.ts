import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { User } from './user';
import bodyParser from "body-parser"
import { GraphqlContext } from '../interfaces';
import JWTService from './services/jwt';

export async function initServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  const server = new ApolloServer<GraphqlContext>({
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
    expressMiddleware(server,{
      context : async({req,res}) => {
        const header = req.headers.authorization;
        return {
          user : header ? JWTService.decodeToken(header.split("Bearer ")[1]) : null
        }
      }
    }),
  );

  return app;
}
