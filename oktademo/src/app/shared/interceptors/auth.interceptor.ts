import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import {  Observable, BehaviorSubject } from "rxjs";
import   'rxjs/add/observable/fromPromise';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
//import { OktaAuthService } from '@okta/okta-angular';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // constructor(private oktaAuth: OktaAuthService) {}
  constructor(private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return Observable.fromPromise(this.handleAccess(request, next));
  }

  private async handleAccess(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    const accessToken = await this._oktaAuth.getAccessToken();
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    return next.handle(request).toPromise();
  }
}