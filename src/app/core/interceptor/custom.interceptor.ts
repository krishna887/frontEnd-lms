import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  
  const savedToken= localStorage.getItem('token')
  if(savedToken){
    const cloneReq= req.clone({
      setHeaders:{
        Authorization: `Bearer ${savedToken}`
      }
    })
    return next(cloneReq);
  }
  else
  return next(req)
  
};
