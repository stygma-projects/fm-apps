import {CallHandler, ExecutionContext, Injectable, NestInterceptor,} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(data => {
            if (Array.isArray(data)) {
                return data.map(({password, ...rest}) => rest);
            } else if (typeof data === 'object' && data !== null) {
                const {password, ...rest} = data;
                return rest;
            }

        }));
    }
}
