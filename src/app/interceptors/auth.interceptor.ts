import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const authRoutes = ['/auth', '/signup', '/rifa'];
  const isAuthRoute = authRoutes.some((route) => req.url.includes(route));

  if (!isAuthRoute) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(authReq);
  }

  return next(req);
};
