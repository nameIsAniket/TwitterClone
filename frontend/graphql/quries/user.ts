import {graphql} from './../../gql'

export const getToken = graphql(`
    #graphql
    query verifyGoogleToken($token: String) {
        verifyGoogleToken(token: $token)
    }
`);