
import { prismaClient } from "../../client/db";
import { GraphqlContext } from "../../interfaces";

interface CreateTwitterPayload {
    content : string
    imageURL? : string
}

const mutations = {
    createTweet : async (parent:any,{payload}:{payload : CreateTwitterPayload},ctx:GraphqlContext) => {
        if (!ctx.user) throw new Error("Login Needed || You are not authenticated");
        const tweet = await prismaClient.tweet.create({
            data : {
              tweet : payload.content,
                imageURL : payload.imageURL,
                author : {connect : {id : ctx.user.id}}
            }
        });

        return tweet;
    }
}


export const resolvers = {mutations }