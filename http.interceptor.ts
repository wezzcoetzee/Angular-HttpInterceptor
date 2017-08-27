import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const tokenKey = 'jwt.auth.token';
const tokenType = 'Bearer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve token
    const authHeader = this._getToken();
    // set request headers, the new HTTP Client works with imutable headers object.
    // you need to store reference to the previous headers to mutate the object.
    const contentTypeSet = req.headers.set('Content-Type', 'application/json');
    const authHeaderSet = contentTypeSet.set('Authorization', `${tokenType} ${authHeader}`);

    const authReq = req.clone({
      headers: authHeaderSet
    });

    return next.handle(authReq);
  }

  private _getToken(): string {
    return localStorage.getItem(tokenKey);
  }
}
