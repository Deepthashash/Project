import { AuthService } from './app/services/auth.service';
import { User } from './app/models/user.model';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  currentUser: User;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Route guard started');
    console.log(this.currentUser);
    if (this.currentUser === null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      if (next.data.type.includes(this.currentUser.userType)) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }
  }

}
