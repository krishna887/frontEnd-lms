import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../service/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader=inject(LoaderService)
  loader.showLoader()
  
  return next(req).pipe(
    finalize(()=>loader.hideLoader())
  );
};
