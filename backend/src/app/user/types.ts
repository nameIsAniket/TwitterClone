export const types = `#graphql
    type User {
        id : ID!
        firstName : String
        lastName : String
        email : String
        profileImage : String

        follower : [User]
        Following : [User]
        
        tweets : [Tweet]
    }
`