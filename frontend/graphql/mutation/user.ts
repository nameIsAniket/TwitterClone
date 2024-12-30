import { graphql } from "@/gql";

export const FollowUserMutation = graphql(`
    mutation FollowUser($to: ID!) {
        followUser(to: $to)
    } 
`)

export const unFollowUserMutation = graphql(`
    mutation UnfollowUser($to: ID!) {
        unfollowUser(to: $to)
    }
`)