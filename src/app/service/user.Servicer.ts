import { Injectable } from '@angular/core';
import {  UserInfoResponse } from '@fhs/authorize';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserServicer {
    user: UserInfoResponse;
    flagLogout: boolean = false;
    constructor(private router:Router) {
        
    }
    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
    }

    logout(){
        
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