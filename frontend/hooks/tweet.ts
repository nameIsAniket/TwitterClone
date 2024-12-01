import { graphqlClient } from "@/client/api"
import { CreateTweetData } from "@/gql/graphql"
import { createTweetMutation } from "@/graphql/mutation/tweet"
import { getAllTweetsQuery } from "@/graphql/quries/tweet"
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetAllTweets = () => {
    const query = useQuery({
        queryKey : ["get-tweets"], 
        queryFn : ()=> graphqlClient.request(getAllTweetsQuery)
    })

    return {...query,tweets : query.data?.getAllTweets }
}

export const useCreateTweet = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn : (payload : CreateTweetData) => graphqlClient.request(createTweetMutation,{payload}),
        onSuccess : () => queryClient.invalidateQueries(["get-tweets"])
    })
    return mutation;
}