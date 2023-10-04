import { UserModel } from '@app/models/user.model';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { clearScreenDown } from 'readline';

@InputType({description: 'create new user input'})
export class CreateUserInput {
    @Field(()=>String)
    username: string;

    @Field(()=>String)
    email: string;

    @Field(()=>String)
    password: string;
}

@InputType({description:"update user input"})
export class UpdateUserInput {
    @Field(()=>String)
    id: string

    @Field(()=>String)
    username: string

    @Field(()=>String)
    email: string
}

@InputType({description:"pagination input"})
export class PaginationInput {
    @Field(()=>Number)
    page: number;

    @Field(()=>Number)
    perPage: number;
}


@ObjectType({description:"pagination response"})
export class PaginationResponse{
    @Field(()=>[UserModel])
    data:[UserModel] ;

    @Field(()=>Number)
    totalCount: number;
}
