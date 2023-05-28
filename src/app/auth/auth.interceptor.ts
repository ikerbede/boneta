import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { BonetaStoredItems } from '../shared/enums/boneta-stored-items.enum';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // Get the auth token from the service.
  const authToken = sessionStorage.getItem(BonetaStoredItems.Token);

  // Clone the request and set the new header in one step.
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${authToken ?? ''}` },
  });

  // send cloned request with header to the next handler.
  return next(authReq);
};
