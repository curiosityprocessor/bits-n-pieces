import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import logger from "../logger/winston.logger";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest<{ body: unknown }>();
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;
    const params = JSON.stringify(request.body);

    return next.handle().pipe(
      tap((data) => {
        const elapsed = Date.now() - start;
        logger.info(
          `${className}.${handlerName}(${params}) => ${JSON.stringify(data)} in ${elapsed}ms`,
        );
      }),
    );
  }
}
