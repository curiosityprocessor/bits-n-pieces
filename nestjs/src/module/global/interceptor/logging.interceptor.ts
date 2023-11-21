import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import logger from "../logger/winston.logger";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();

    const className = context.getClass().name;
    const handlerName = context.getHandler().name;
    const parameters = JSON.stringify(request.body);

    return next.handle().pipe(
      tap((data) => {
        const executionTime = Date.now() - start;
        logger.info(
          `${className}.${handlerName}(${parameters}) => ${JSON.stringify(
            data,
          )} in ${executionTime}ms`,
        );
      }),
    );
  }
}
