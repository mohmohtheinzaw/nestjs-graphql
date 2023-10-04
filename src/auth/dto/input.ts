import { Field, ID, InputType } from '@nestjs/graphql';

@InputType({ description: 'Login Input' })
export class LoginInput {
  @Field(() => String)
  email: string ;

  @Field(() => String)
  password: string ;
}

@InputType({description:'create user input'})
export class RegisterUserInput{
  @Field(()=>String)
  email:string

  @Field(()=>String)
  username:string

  @Field(()=>String)
  password:string

}



