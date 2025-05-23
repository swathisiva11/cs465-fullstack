import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

//import { jwtInterceptor } from './jwt.interceptor';

/* 
describe('jwtInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => jwtInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
}); */

// Fixed the error, incorrect usage of jwtInterceptor. 
import { JwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor', () => {
  let interceptor: JwtInterceptor;

  beforeEach(() => {
    interceptor = new JwtInterceptor({} as any); // Mock AuthenticationService
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
