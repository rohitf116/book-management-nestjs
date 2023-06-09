import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  createParamDecorator,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export class OwnerCheck implements NestInterceptor {
  constructor(private service: any) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    //befor a reuest handlet
    console.log(this.service);
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const { id } = request.params;
    const item = await this.service.findOne(id);
    if (!item) {
      throw new NotFoundException('item not found');
    }
    console.log(id);
    return next.handle().pipe();
  }
}
export function Owner(service: any) {
  return UseInterceptors(new OwnerCheck(service));
}
