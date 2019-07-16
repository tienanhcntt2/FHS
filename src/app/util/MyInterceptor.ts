import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let MyAuthToken = localStorage.getItem("access_token");
    const reqHeader = req.clone({headers: req.headers.set('Authorization', 'Bearer '+MyAuthToken)});
    return next.handle(reqHeader);
  }
}