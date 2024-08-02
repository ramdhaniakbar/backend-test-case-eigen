import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => ({
        status: context.switchToHttp().getResponse().statusCode,
        message: data?.message || 'success',
        data: data?.data || data,
        meta: data?.meta || {},
        error: [],
      })),
    );
  }
}
