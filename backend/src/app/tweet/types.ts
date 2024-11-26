export const types = `#graphql
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
`