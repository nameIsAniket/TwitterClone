import { graphql } from "@/gql";


export const getAllTweetsQuery = graphql(`
    query GetAllTweets {
        getAllTweets {
            id
            tweet
            imageURL
            author {
            id
            firstName
            lastName
            profileImage
            }
        }
    }
`)