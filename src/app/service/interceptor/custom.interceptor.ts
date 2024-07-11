import { HttpInterceptorFn } from '@angular/common/http';

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
