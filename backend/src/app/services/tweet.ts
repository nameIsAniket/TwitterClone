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
        await redisClient.set("allTweets", JSON.stringify(tweets));
        return tweets;
    }

    public static async createTweet(payload:CreateTwitterPayload, user:any){
        const RateLimited = await redisClient.get(`RateLimted:${user.id}`);
        if(RateLimited) return new Error("Rate limited for 5 seconds")
        const tweet = await prismaClient.tweet.create({
            data : {
                tweet : payload.content,
                imageURL: payload.imageURL,
                author : {connect : {id : user.id }}
            }}
        )
        await redisClient.del("allTweets");
        await redisClient.setex(`RateLimted:${user.id}`,5,"RateLimited")
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