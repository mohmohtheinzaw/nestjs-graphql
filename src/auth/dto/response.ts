import { UserModel } from '@app/models/user.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Login Result' })
export class LoginResult {
  @Field(() => UserModel)
  user: UserModel | undefined;

  @Field(() => String)
  token: String | undefined;
}
