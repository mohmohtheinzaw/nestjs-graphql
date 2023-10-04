import { UserModel } from '@app/models/user.model';
import { PrismaService } from '@app/prisma.service';
import { Injectable } from '@nestjs/common';
import { LoginInput, RegisterUserInput } from './dto/input';
import { LoginResult } from './dto/response';
import { getToken } from '@app/lib/helper';
import { getHashed } from '@app/lib/helper';
@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService
        ){}

    async registerUser(dto:RegisterUserInput):Promise<UserModel> {
                
        return this.prismaService.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                password: getHashed(dto.password).toString(),
            }
        })
            .then((data) => {
                return data
            }).catch((error) => {
                return error
            })
    }

    async loginUser(dto:LoginInput):Promise<LoginResult>{
        return this.prismaService.user.findUniqueOrThrow({
            where:{
                email:dto.email,
                password:getHashed(dto.password).toString(),
            }
        }).then((data)=>{
            
            return {
                user:data,
                token:getToken(data.email)
            }
        }).catch((error)=>{
            console.log(error)
            return error
        })
    }        

}
