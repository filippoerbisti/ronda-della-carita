import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpXsrfTokenExtractor, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    headerName = 'X-XSRF-TOKEN';

    constructor(
        private tokenService: HttpXsrfTokenExtractor
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({
            withCredentials: false
        })
        console.log(req);

        req.headers.set('withCredentials', 'true');

        let csrfToken = this.tokenService.getToken() as string;

        if (csrfToken !== null && !req.headers.has(this.headerName)) {
            req = req.clone({ headers: req.headers.set(this.headerName, csrfToken) });
        }
        return next.handle(req);
    }
}

