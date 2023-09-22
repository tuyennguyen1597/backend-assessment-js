import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseResult } from './response';


@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseResult> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseResult> {
        return next.handle().pipe(map((data: ResponseResult) => data));
    }
}