import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.isBrowser()) {
      const authToken = sessionStorage.getItem('auth_token');
      if (authToken) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // Se não estiver no navegador, talvez queira lidar com isso de uma forma específica
      this.router.navigate(['/login']);
      return false;
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }
}