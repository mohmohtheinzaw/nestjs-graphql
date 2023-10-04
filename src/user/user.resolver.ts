import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from '@app/models/user.model';
import { PaginationInput } from './user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel)
  async getUser(@Args('id') id: string): Promise<UserModel> {
    return this.userService.get(id);
  }

  @Query(() => [UserModel])
  async searchUser(@Args('text') text: string): Promise<UserModel[]> {
    return this.userService.search(text);
  }

  @Query(() => [UserModel])
  async paginationUser(
    @Args('dto') dto: PaginationInput,
  ): Promise<UserModel[]> {
    return this.userService.pagination(dto);
  }
  
}
