import { UserDocument } from "@app/common/models";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => { 
  return context.switchToHttp().getRequest().user
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getCurrentUserByContext(context)
)