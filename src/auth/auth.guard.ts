import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
// import { ResponserException } from 'src/http-filter-exception';

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new HttpException('Token Not Found', 404)
        }
        try {
            const decoded = await this.jwtService.verify(token, {
                secret: '123',
            });
            request['user'] = decoded;
        } catch {
            throw new UnauthorizedException()
        }
        return true;
    }
    //
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
