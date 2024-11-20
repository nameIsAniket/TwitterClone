import { graphqlClient } from "@/client/api"
import { getCurrentUser } from "@/graphql/quries/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ["current-user"],
        queryFn: () => graphqlClient.request(getCurrentUser)
    });

    return {...query,user : query.data?.getCurrentUser}
}