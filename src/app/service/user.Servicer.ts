import { Injectable } from '@angular/core';
import { FhsAuthorizeService, UserInfoResponse } from '@fhs/authorize';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserServicer {
    user: UserInfoResponse;
    constructor(private router:Router) {
        
    }
    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
    }

    logout(){
        localStorage.setItem("access_token","");
        this.router.navigateByUrl("/wind/home"); 
        location.reload();
    }
    chienchalogin(){
       
        if(localStorage.getItem("access_token").length <= 0){
            alert("Please Login");
            this.router.navigateByUrl('/wind/home');
        }
    }
}