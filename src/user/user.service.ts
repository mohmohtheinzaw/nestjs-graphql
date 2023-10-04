import { PrismaService } from '@app/prisma.service';
import { Injectable } from '@nestjs/common';
import {  PaginationInput, UpdateUserInput } from './user.dto';
import { UserModel } from '@app/models/user.model';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService){}

    async get(id:string):Promise<UserModel>{
        return this.prismaService.user.findUnique({
            where:{id:id}
        }).then((data)=>{
            return data
        }).catch((error)=>{
            return error
        })
    }

    async search(text:string):Promise<UserModel[]>{
        return this.prismaService.user.findMany({
            where:{
                OR:[
                    {
                        username:{
                            contains:text ,
                            mode:'insensitive'
                        }
                    },
                    {
                        email:{
                            contains:text,
                            mode:'insensitive'
                        }
                    }
                ]
            }
        }).then((data)=>{
            return data
        }).catch((error)=>{
            return error
        })
    }

    async pagination(dto:PaginationInput):Promise<UserModel[]>{
        const page: number = dto.page || 1
        const perPage: number = dto.perPage || 10

        return this.prismaService.user.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            orderBy:{
                createdAt:'desc'
            }
        }).then((data)=>{
            return data
        }).catch((error)=>{
            return error
        })

    }

    async update(dto:UpdateUserInput):Promise<UserModel>{
        return this.prismaService.user.update({
            where:{id:dto.id},
            data:{
                username:dto.username,
                email:dto.email
            }
        }).then((data)=>{
            return data
        }).catch((error)=>{
            return error
        })
    }

}
