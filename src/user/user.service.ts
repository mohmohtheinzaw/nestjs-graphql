import { PrismaService } from '@app/prisma.service';
import { Injectable } from '@nestjs/common';
import {  PaginationInput, PaginationResponse, UpdateUserInput } from './user.dto';
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

    async pagination(dto:PaginationInput):Promise<PaginationResponse>{
        const page: number = dto.page || 1
        const perPage: number = dto.perPage || 10
        const totalCount = await this.prismaService.user.count()
        return this.prismaService.user.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            orderBy:{
                createdAt:'desc'
            }
        }).then((data)=>{
            return {data,totalCount}
        }).catch((error)=>{
            return error
        })

    }


    // const pagination = {
    //             lastPage: totalPages,
    //             perPage,
    //             currentPage: page,
    //             total: totalCount,
    //             count: users.length
    //         }


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


    async delete(id:string):Promise<UserModel>{
        return this.prismaService.user.delete({
            where:{id}
        }).then((data)=>{
            return data
        }).catch((error)=>{
            return error
        })
    }

}
