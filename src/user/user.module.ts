import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { PrismaService } from '@app/prisma.service';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver,PrismaService,UserService],
})
export class UserModule {}
