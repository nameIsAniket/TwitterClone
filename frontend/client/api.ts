import { GraphQLClient } from "graphql-request";

const isClient = typeof window != "undefined";

export const graphqlClient = new GraphQLClient('https://d2b8di08o9rv2o.cloudfront.net/graphql',
    {
        headers : ()=>({
            Authorization : isClient ? `Bearer ${window.localStorage.getItem('jwttokenforTwitter')}` : ""
        })
    }
);