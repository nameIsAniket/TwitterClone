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
import { S3Client,PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import UserServices from './services/user';
import TweetService from './services/tweet';

interface CreateTwitterPayload {
    content : string
    imageURL? : string
}

const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID ;
const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION;

if (!AWS_SECRET_ACCESS_KEY || !AWS_ACCESS_KEY_ID) throw new Error('S3 details not provided');

const s3Client = new S3Client(
  {
    region : AWS_DEFAULT_REGION,
    credentials : {accessKeyId:AWS_ACCESS_KEY_ID,secretAccessKey:AWS_SECRET_ACCESS_KEY}
  }
);

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
        getSignedURLForTweet(imageType:String!,imageName:String!) : String
      }
      
      type Mutation {
        createTweet(payload : CreateTweetData!):Tweet
        ${User.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        getAllTweets : ()=>{
          return TweetService.getAllTweets();
        },
        getSignedURLForTweet : async(parent,{imageType,imageName}:{imageType:string,imageName:string},ctx:GraphqlContext) => {

          if(!ctx.user) throw new Error('Unauthenticated');

          const allowedImageType = ["jpg","jpeg","png","webp"];

          if(!allowedImageType.includes(imageType)) throw new Error("Unsupported Image");

          const putObjectCommand = new PutObjectCommand({
            Bucket : "aniket-twitter-dev",
            Key : `/uploads/${ctx.user.id}/${imageName}-${Date.now()}.${imageType}`
          })

          const signedUrl = await getSignedUrl(s3Client,putObjectCommand,{expiresIn : 43200});
          return signedUrl;
        }
      },

      ...User.resolvers.extraResolver,

      Mutation: {
        createTweet : async (parent:any,{payload}:{payload : CreateTwitterPayload},ctx:GraphqlContext) => {
          if (!ctx.user) throw new Error("Login Needed || You are not authenticated");
          const tweet = TweetService.createTweet
          (payload,ctx?.user)
          return tweet;
        },

        ...User.resolvers.mutations
      },

      Tweet : {
        author : (parent : Tweet,) => {
          return UserServices.getUserByID(parent.authorId);
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
