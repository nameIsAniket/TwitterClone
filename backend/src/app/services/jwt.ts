import { User } from "@prisma/client";
import { prismaClient } from "../../client/db";
import JWT from "jsonwebtoken";

class JWTService{
    public static async generateTokenForUser(user: User){
        const payload = {
            id : user?.id,
            email : user?.email
        }

        const token = JWT.sign(payload,"jwtsecrete")  
        return token;
    }
}

export default JWTService;