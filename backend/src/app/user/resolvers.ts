import axios from "axios";
import { prismaClient } from "../../client/db";
import JWTService from "../services/jwt";
import { GraphqlContext } from "../../interfaces";
import { User } from "@prisma/client";
import UserServices from "../services/user";

interface GoogleTokenResponse {
    iss?: string,
    azp?: string,
    aud?: string,
    sub?: string,
    email: string,
    email_verified?: string,
    nbf?: string,
    name?: string,
    picture: string,
    given_name: string,
    family_name: string,
    iat?: string,
    exp?: string,
    jti?: string,
    alg?: string,
    kid?: string,
    typ?: string
}

const queries = {
    verifyGoogleToken : async(parent : any,{token}:{token : string}) => {
        const JWTtoken = UserServices.verifyGoogleToken(token);
        return JWTtoken;        
    },

    getCurrentUser : async(parent : any, args:any,ctx:GraphqlContext) =>{
        const id = ctx.user?.id;
        if (!id) return null;
        return UserServices.getUserByID(id);
    },

    getUserByID : async(parent : any, {givenId}:{givenId : string},ctx:GraphqlContext) =>{
        return UserServices.getUserByID(givenId);
    }
}

const extraResolver = {
    User : {
        tweets : (parent: User)=> prismaClient.tweet.findMany({where : {author : {id : parent.id}}}),

        follower : {
            follow : async (parent: User) => {
                const result = await prismaClient.follow.findMany({
                    where : { Following: { id : parent.id}},
                    include : { follower : true }
                });
                return result.map((el) => el.follower)
            }
        },
        
        Following : {
            follow :async (parent: User)=> {
                const result = await prismaClient.follow.findMany({
                    where : { follower : { id : parent.id}},
                    include : { Following : true }
                });
                
                return result.map((el) => el.Following)
            }       
        }

    },
    
}

const mutations = {
    followUser: async (parent:any,{to}:{to:string},ctx:GraphqlContext) => {
        if(!ctx.user) throw new Error("unauthenticated");
        await UserServices.followUser(ctx.user.id,to);
    },

    unfollowUser: async (parent:any,{to}:{to:string},ctx:GraphqlContext) => {
        if(!ctx.user) throw new Error("unauthenticated");
        await UserServices.unfollowUser(ctx.user.id,to);
    }
}

export const resolvers = {queries,extraResolver,mutations}