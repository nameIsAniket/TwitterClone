import { graphql } from "@/gql";


export const getAllTweetsQuery = graphql(`
    query GetAllTweets {
        getAllTweets {
            id
            tweet
            imageURL
            author {
            firstName
            lastName
            profileImage
            }
        }
    }
`)