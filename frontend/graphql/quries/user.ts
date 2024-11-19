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
        }
    }
`);