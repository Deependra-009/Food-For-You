import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginStatusService } from "./login-status.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginStaus: LoginStatusService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add jwt token
        let auth = req;
        const token = this.loginStaus.getToken();
        // console.log(token);
        
    //   console.log(`Bearer ${token}`);
        // console.log(auth);
        if (token != null) {
            
            
            auth = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                  },
            })


        }

        // console.log(auth);



        return next.handle(auth);



    }

}

export const authInterceptorProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
]