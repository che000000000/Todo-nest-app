import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const Authorized = createParamDecorator(
    (_, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()

        if (!request.user) throw new UnauthorizedException('User not authorized.')

        return request.user.dataValues.id
    }
)