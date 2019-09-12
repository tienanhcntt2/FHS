import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommonService } from 'src/app/service/CommonService';
import { NavComponent } from 'src/app/nav/nav.component';

import { FhsAuthorizeService } from '@fhs/authorize';
import { InfoService } from 'src/app/service/info.Servicer';
import { first } from 'rxjs/internal/operators/first';

import { Paho } from 'ng2-mqtt/mqttws31'
import { Winds } from 'src/app/model/Winds';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SlideMenuComponent } from 'src/app/util/slide-menu/slide-menu.component';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DialogLoaddingComponent } from 'src/app/dialog-loadding/dialog-loadding.component';
import { MatDialog } from '@angular/material';
import { AutherService } from 'src/app/service/autherService';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {



  // datecurrent
  today: number = Date.now();

  // menu 
  private clickOpen: number = 0;


  public icon_val: string;
  public flags: boolean = false;
  public winds: Winds[] = [];
  private url_home: string = "http://10.199.15.95:80/mops/Meteorology/info";
  private _client: Paho.MQTT.Client;
  // value mqtt
  public localtion: String;
  public huminity: number;
  public nameFengxiang: String;
  public wind_direction: number;
  public wind_speed: number;
  public temperature: number;
  public rainfall : number;
  private heightRigh: number;
  /**
   * change background
   */
  public imagSource: string = "assets/image/raingif.gif";
  public imageIcon: string  = "assets/image/4.png";
  private animal: string;
  private  name: string;



  /**
   * home
   * @param commonService 
   * @param auth 
   * @param infoService 
   */
  constructor(private commonService: CommonService, private auth: FhsAuthorizeService, private infoService: InfoService,
    private translateService: TranslateService,private titleService: Title, private router:Router,public dialog: MatDialog,
    private authService: AutherService ) {
      this.getToken();
      this.connectMQTT();
    translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.sendTitle();
      this.getdataHome();
    });

  }

  ngOnInit() {
    this.sendTitle();
    this.getdataHome();
  }


  ngOnDestroy() {
   
  }

  private  getToken(){
    if(this.auth.AccessToken.length >0){
    
      this.authService.savetoken(this.auth.AccessToken);
      this.commonService.notifyOther({option:"header",value:true});
    }
  }
 
  sendTitle() {
    this.commonService.notifyOther({option:"home",value:this.translateService.instant("menu.home")});
    this.commonService.notifyOther({option:"numberMenu", value:0});
    this.titleService.setTitle(this.translateService.instant("home.weather"));
    this.commonService.notifyOther({option:"flagsShow", value: false});
  }



  // connect MQTT
  private connectMQTT() {
    this._client = new Paho.MQTT.Client('10.199.15.95', 80, 'ng-mqttid-' + this.makeid(8));
    this._client.onConnectionLost = (responseObject: Object) => {

    };

    this._client.connect({
      onSuccess: this.onConnected.bind(this)
    });

    this.getMessage();
  }
  private makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  // get message MQTT
  private getMessage() {
    this._client.onMessageArrived = (message: Paho.MQTT.Message) => {
      if (message.destinationName == 'MeteorologyInfo') {
        let obj: MyObj = JSON.parse(message.payloadString);
     
        this.wind_speed = parseInt(obj.WindVelocity.toString().split('.') +"");
        this.huminity = parseInt(obj.Humidity.toString().split('.') +"");
        this.localtion = obj.Location;
    
        this.temperature = parseInt(obj.Temperature.toString().split('.') + "");
        this.rainfall = obj.Rainfall;
        this.wind_direction = parseInt(obj.WindDegree.toString().split('.') +"");
        this.nameFengxiang = obj.WindDirection;
        

      }

    };
    
  }
  private onConnected(): void {
    this._client.subscribe('MeteorologyInfo', {
      qos: 1
    });
  }


  private getdataHome() {
    this.infoService.getinfoHomeV2(this.url_home).pipe(first()).subscribe(info => {

      this.localtion = info.location;
      this.wind_speed = parseInt(info.windVelocity.toString().split('.') +"");
      this.huminity =parseInt(info.humidity.toString().split('.') +"");
      this.temperature = parseInt(info.temperature.toString().split('.') + "");
      //this.setBackgound(info.humidity);
      this.rainfall = info.rainfall;
      this.wind_direction = parseInt(info.windDegree.toString().split('.') +"");
      this.nameFengxiang = info.windDirection;
      this.commonService.notifyOther({option:"location", value:this.localtion});
    })
  }

  private setBackgound(humidity: number, rainfall:number,temp:number) {
    // if((humidity>=0 && humidity<=10) && (rainfall>=0 && rainfall<=10) && (temp>=0 && temp<=10)){
    //   this.imageIcon = "assets/image/1.png";
    // } else if(){
    //   this.imageIcon = "assets/image/2.png";
    // }else if(){
    //   this.imageIcon = "assets/image/1.png";
    // }
  }



  public splitNumber(humidity: number):string {
    if(humidity == 0){
      return 0+"";
    }
    var str = humidity.toString();
    var numarray = str.split('.');
    var a = new Array();
    a = numarray;
    return a[0] +"."+this.numberFist(parseInt(a[1],10));
  }
  private numberFist(n :number) : number{
    var length = n.toString().length;
    if(length>=1){
      return  parseInt(n.toString().substring(0, 1));
    }
    return 0;
  }
  public sendURL(i:number){
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl(this.winds[i].link);
    }else{
      this.openDialog(2);
    }
    
  }
  public gotoTemperature(){
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl("temperature");
    }else{
      this.openDialog(2);
    }
  }
  public gotoHuminity(){
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl("humidity");
    }else{
      this.openDialog(2);
    }
  }
  public gotoRainFall(){
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl("rainfall");
    }else{
      this.openDialog(2);
    }
  }
  public gotoWindSpeed(){
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl("speed");
    }else{
      this.openDialog(2);
    }
  }
  public gotoWindDirection(){
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl("direction");
    }else{
      this.openDialog(2);
    }
  }
  openDialog(position: number): void {
    const dialogRef = this.dialog.open(DialogLoaddingComponent, {
      width: "auto",
      height: "auto",
      data: { name: this.name, animal: this.animal, key: position }, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  customizeText(arg: any) {
    let temp = '';
    switch (arg.valueText) {
      case '0' || '360': {
        //statements; 
        temp = 'N';
        break;
      }
      
      
      case '45.0': {
        //statements; 
        temp = 'NE';
        break;
      }
      case '90.0': {
        //statements; 
        temp = 'E';
        break;
      }
      case '135.0': {
        //statements; 
        temp = 'SE';
        break;
      }
      case '180.0': {
        //statements; 
        temp = 'S';
        break;
      }
      case '225.0': {
        //statements; 
        temp = 'SW';
        break;
      }
      case '270.0': {
        //statements; 
        temp = 'W';
        break;
      }
      case '315.0': {
        //statements; 
        temp = 'WN';
        break;
      }
      default: {
        //statements; 
        break;
      }
    }return temp;
  }
}




interface MyObj {
  Timestamp: Date;
  Location: string;
  WindVelocity: number;
  WindDegree: number;
  Humidity: number;
  Temperature: number;
  WindDirection: string;
  AtmosphericPressure: number;
  Rainfall: number;
}