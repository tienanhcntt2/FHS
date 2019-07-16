import { OnInit } from '@angular/core';
import { CommonService } from '../service/CommonService';

export class SendData {

    constructor(private commoService : CommonService){

    }

    public sendValue(title:string,value:string){
        this.commoService.notifyOther({option: title, value: value});
    }


}