import { User } from "@prisma/client";
import { prismaClient } from "../../client/db";
import JWT from "jsonwebtoken";
import { JWTUser } from "../../interfaces";

class JWTService{
    public static async generateTokenForUser(user: User){
        const payload:JWTUser = {
            id : user?.id,
            email : user?.email
        }

        const token = JWT.sign(payload,"jwtsecrete")  
        return token;
    }

    public static decodeToken(token : string){
        try {
            return JWT.verify(token,"jwtsecrete") as JWTUser;
        } catch (error) {
            return null;
        }
    }
}

export default JWTService;