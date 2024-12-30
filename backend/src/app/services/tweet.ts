import { User } from "@prisma/client";
import { prismaClient } from "../../client/db";
import { Tweet } from "../tweet";
import redisClient from "../../client/redis";

interface CreateTwitterPayload {
    content : string
    imageURL? : string
}

class TweetService{
    public static async getAllTweets(){
        const cachedTweetsString = await redisClient.get("allTweets");
        if(cachedTweetsString) return JSON.parse(cachedTweetsString);
        const tweets =  await prismaClient.tweet.findMany({orderBy : {createdAt : 'desc'}})
        await redisClient.setex("allTweets",10, JSON.stringify(tweets));
        return tweets;
    }

    public static async createTweet(payload:CreateTwitterPayload, user:any){
        const tweet = await prismaClient.tweet.create({
            data : {
                tweet : payload.content,
                imageURL: payload.imageURL,
                author : {connect : {id : user.id }}
            }}
        )
        await redisClient.del("allTweets");
        return tweet;
    }

    public static followUser(from:string, to:string){
        return prismaClient.follow.create({
            data : {
                follower : {connect : {id: from}},
                Following : {connect : {id: to}}
            }
        })
    }

    public static unfollowUser(from:string, to:string){
        return prismaClient.follow.delete({
            where : {
                follwerId_FollowingId : {follwerId: from, FollowingId: to}
            }
        })
    }
}

export default TweetService;