import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AutherService } from './autherService';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private autherService: AutherService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        if (this.autherService.isUserLoggedIn() && localStorage.getItem("token")) {
            request = request.clone({
                setHeaders: {
                    Authorization: localStorage.getItem('token')
                }
            });
        }

        return next.handle(request);
    }
}