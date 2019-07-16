import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Info } from '../model/Info';
import { Home } from '../model/home';
import { Homev2 } from '../model/Homev2';

import { WindRose } from '../model/WindDescription';



@Injectable({ providedIn: 'root' })
export class InfoService{

    url='http://localhost:3000/info';
    public windRose : WindRose;
    constructor(private http: HttpClient){}
    getinfoSpeed() {
        return this.http.get<Info[]>(this.url);
    }
    getinfoHome(url: string){
        return this.http.get<Home[]>(url);
    }
    getinfoHomeV2(url: string){
        return this.http.get<Homev2>(url);
    }

    getdataSpeed(url: string, auth_token:string){
        return this.http.get<WindRose>(url, {
            headers: new HttpHeaders().set('Authorization', 'Bearer '+auth_token)
        }).subscribe(
            result => {
               this.windRose = result;
            },
            err => {
              console.log("Error- something is wrong!")
        });
    }

}