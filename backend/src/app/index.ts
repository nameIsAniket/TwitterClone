import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express, { query } from 'express';

export async function initServer(){
    const app = express();

    const server = new ApolloServer<any>({
    typeDefs : `
        type Query {
            sayHello:String
        }
    `,
    resolvers: {
        Query : {
            sayHello : () => "Hello"
        }
    },
    });
    // Note you must call `start()` on the `ApolloServer`
    // instance before passing the instance to `expressMiddleware`
    await server.start();

    // Specify the path where we'd like to mount our server

    app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server),
    );
    
    return app;
}

