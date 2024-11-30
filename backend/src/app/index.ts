import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import bodyParser from "body-parser"
import { GraphqlContext } from '../interfaces';
import JWTService from './services/jwt';
import { User } from './user';
import { prismaClient } from "../client/db";
import { Tweet } from '@prisma/client';


interface CreateTwitterPayload {
    content : string
    imageURL? : string
}

export async function initServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  const server = new ApolloServer<GraphqlContext>({
    typeDefs: `
      ${User.types}
      input CreateTweetData {
        content : String!
        imageURL : String
      }

      type Tweet {
        id : ID!
        tweet : String!
        imageURL : String
        
        author : User 
      }

      type Query {
        ${User.queries}
        getAllTweets : [Tweet]
      }
      
      type Mutation {
        createTweet(payload : CreateTweetData!):Tweet
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        getAllTweets : ()=>{
          return prismaClient.tweet.findMany({orderBy : {createdAt : 'desc'}})}
      },

      ...User.resolvers.extraResolver,

      Mutation: {
        createTweet : async (parent:any,{payload}:{payload : CreateTwitterPayload},ctx:GraphqlContext) => {
          if (!ctx.user) throw new Error("Login Needed || You are not authenticated");
          const tweet = await prismaClient.tweet.create({
              data : {
                  tweet : payload.content,
                  imageURL : payload.imageURL,
                  author : {connect : {id : ctx.user.id}}
              }
          });
          return tweet;
        }
      },

      Tweet : {
        author : (parent : Tweet,) => {
          const user = prismaClient.user.findUnique({where : {id : parent.authorId}})
          return user;
        }
      }
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
        return {
          user : req.headers.authorization ? JWTService.decodeToken(req.headers.authorization.split("Bearer ")[1]) : null
        }
      }
    }),
  );

  return app;
}
