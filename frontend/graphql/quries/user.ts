import {graphql} from './../../gql'

export const getToken = graphql(`
    #graphql
    query verifyGoogleToken($token: String) {
        verifyGoogleToken(token: $token)
    }
    query ExampleQuery {
        getCurrentUser {
            id
            email
            firstName
            lastName
            profileImage
        }
    }
`);

export const getCurrentUser = graphql(`
    #graphql
    query getCurrentUser {
        getCurrentUser {
            id
            email
            firstName
            lastName
            profileImage
             tweets {
                tweet
                imageURL
                id
                author {
                    profileImage
                    firstName
                    lastName
                }
            }
        }
    }
`);

export const getUserByIdQuery = graphql(`
#graphql
query GetUserByID($givenId: ID!) {
  getUserByID(givenId: $givenId) {
    id
    firstName
    lastName
    profileImage
    tweets {
      id
      tweet
      author {
        id
        firstName
        lastName
        profileImage
      }
    }
  }
}`);

export const getSignedURLForTweetQuery = graphql(`
    query getSignedURLForTweet($imageType: String!, $imageName: String!) {
        getSignedURLForTweet(imageType: $imageType, imageName: $imageName)
      }`
)