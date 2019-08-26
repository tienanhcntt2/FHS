import { Injectable } from '@angular/core';
import { FhsAuthorizeService } from '@fhs/authorize';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class AutherService {
    constructor( private router: Router) {

     }
     savetoken(token:string){
        let tokenStr= 'Bearer '+token;
        localStorage.setItem('token', tokenStr);
     }
     isUserLoggedIn() {
        let token = localStorage.getItem('token');
        return !(token === null)
      }
      logOut() {
        localStorage.removeItem('token');
        window.location.href = "wind/home";
      }
  }