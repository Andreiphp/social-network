import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuards implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        if (sessionStorage.getItem('user') === 'true') {
            return true;
        } else {
            this.router.navigate(['/']);

            return false;
        }
    }

}
