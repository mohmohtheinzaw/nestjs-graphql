import * as crypto from "crypto"
import * as jwt from "jsonwebtoken"


    export const getToken = function(payload:string){
        return jwt.sign(payload,process.env.SECRET_KEY)
    }

    export const getHashed = function (payload: string): String {
        return crypto.createHash("sha1").update(payload).digest("hex")
    }

     // Get random hashed string
    export const getRandomHashedString= function(bytes: number = 40): string {
        return crypto.randomBytes(bytes).toString("hex")
    }
