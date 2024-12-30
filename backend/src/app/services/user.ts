import axios from "axios";
import { prismaClient } from "../../client/db";
import JWTService from "./jwt";
import redisClient from "../../client/redis";

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

class UserServices{
    public static async verifyGoogleToken (token:string):Promise<string> {
        const googleToken = token;
        const googleOAuthUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
        googleOAuthUrl.searchParams.set("id_token",googleToken)

        try {
            const {data} = await axios.get<GoogleTokenResponse>(googleOAuthUrl.toString(),{responseType:"json"})

            //console.log(data);
            
            const user = await prismaClient.user.findUnique({
                where : {email : data.email}
            })

            if(!user){
                await prismaClient.user.create({
                    data : {
                        email:data.email,
                        firstName : data.given_name,
                        lastNamme : data.family_name,
                        profileImage : data.picture
                    }
                })
            }

            const userInDB = await prismaClient.user.findFirst({
                where : {email : data.email}
            })

            if(!userInDB) throw new Error("Issue in verifyGoogleToken");

            const JWTtoken = await JWTService.generateTokenForUser(userInDB)

            return JWTtoken;
        } catch (error) {
            return `${error}`;
        }
    }

    public static async getUserByID(givenId:string){
        const cachedUser = await redisClient.get(`user:${givenId}`);
        if(cachedUser) return JSON.parse(cachedUser);
        if (!givenId) return null;
        const user = await prismaClient.user.findUnique({where : {id : givenId}});
        await redisClient.set(`user:${givenId}`,JSON.stringify(user));
        return user;
    }

    public static followUser( from : string, to : string){
        return prismaClient.follow.create({
            data : {
                follower : {connect : { id : from }},
                Following : {connect : {id : to}}
            }
        })
    }

    public static unfollowUser( from : string, to : string){
        return prismaClient.follow.delete({
            where : {
                follwerId_FollowingId : { follwerId : from, FollowingId : to}
            }
        })
    }
}

export default UserServices;