import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "User Model" })
export class UserModel {
    @Field(type => ID)
    id: string ;

    @Field(() => String)
    username: string 

    @Field(() => String)
    email: string 

    @Field(() => String)
    password: string 

    @Field(() => Boolean)
    isActive: boolean 

    @Field(() => Date)
    createdAt: Date 

    @Field(() => Date)
    updatedAt: Date 
}