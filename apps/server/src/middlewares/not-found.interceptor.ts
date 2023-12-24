import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    {
      // next.handle() is an Observable of the controller's result value
      return next.handle().pipe(
        tap((data) => {
          if (
            (data === undefined || data === null) &&
            context.switchToHttp().getRequest().method === 'GET'
          ) {
            throw new NotFoundException()
          }
        })
      )
    }
  }
}
