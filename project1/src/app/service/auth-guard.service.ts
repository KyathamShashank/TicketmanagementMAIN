import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!sessionStorage.getItem('OrgLogin'); 
    const isLoggInEmployee=!!sessionStorage.getItem('LoginEmployee');
    if (!isLoggedIn && !isLoggInEmployee) {
      this.router.navigate(['/login']); 
      return false; 
    }
    return true; 
  }  
}
