import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserModel } from '@app/models/user.model';
import { CreateUserInput } from '@app/user/user.dto';
import { LoginResult } from './dto/response';
import { LoginInput, RegisterUserInput } from './dto/input';

@Resolver('auth')
export class AuthResolver {
    constructor(private authService: AuthService){}
    
    @Mutation(()=>UserModel)
    async registerUser(@Args('userDto') userDto:RegisterUserInput):Promise<UserModel>{
        return await this.authService.registerUser(userDto)
    }

    @Mutation(()=>LoginResult)
    async loginUser(@Args('dto') dto:LoginInput):Promise<LoginResult>{
        return await this.authService.loginUser(dto)
    }
}
