import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TfrService } from './modules/tfr/tfr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tfrserv:TfrService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.tfrserv.isloggedin()){
        this.router.navigate(['']);
        return false;
      }
      return this.tfrserv.isloggedin();
  }
}
