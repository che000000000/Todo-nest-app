import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/models/user";

export const Authorized = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user 

        return user.dataValues.id
    }
)