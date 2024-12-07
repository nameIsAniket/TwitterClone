import axios from "axios";
import { prismaClient } from "../../client/db";
import JWTService from "../services/jwt";
import { GraphqlContext } from "../../interfaces";
import { User } from "@prisma/client";

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
            return error;
        }
        
    },

    getCurrentUser : async(parent : any, args:any,ctx:GraphqlContext) =>{
        // console.log(ctx);
        const id = ctx.user?.id;
        if (!id) return null;
        //console.log("ctx_user",ctx.user);
        const user = await prismaClient.user.findUnique({where : {id}});
        return user;
    },

    getUserByID : async(parent : any, {givenId}:{givenId : string},ctx:GraphqlContext) =>{
        if (!givenId) return null;
        const user = await prismaClient.user.findUnique({where : {id : givenId}});
        return user;
    }
}

const extraResolver = {
    User : {
        tweets : (parent: User)=> prismaClient.tweet.findMany({where : {author : {id : parent.id}}})
    }
}

export const resolvers = {queries,extraResolver}