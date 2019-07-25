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



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

   // datecurrent
   today: number = Date.now();

   // menu 
   private clickOpen : number = 0;
   @ViewChild('drawer') drawer;
   @ViewChild(NavComponent)
   private nav: NavComponent;

   public icon_val: string;
   public flags : boolean = false;
   public winds : Winds[] = [];
   private url_home: string ="http://10.199.15.95:80/mops/Meteorology/info";
   private _client: Paho.MQTT.Client;
   public localtion : String ="Ha Tinh";
   public shidu : number = 28;
   public wendu : number = 10;
   public fengxiang: String = "EAST";
   public fengshi : number = 30;

   private heightRigh :number;
   /**
    * change background
    */
   public  imagSource: string ="../../assets/image/raingif.gif";
   public imageIcon : string = "../../assets/image/1.png";
  

   
   /**
    * home
    * @param commonService 
    * @param auth 
    * @param infoService 
    */
  constructor(private commonService : CommonService,private auth: FhsAuthorizeService,private infoService: InfoService, 
    private translateService: TranslateService) { 
    
    this.connectMQTT();
    translateService.onLangChange.subscribe((event: LangChangeEvent) => {
     
      this.getdataHome();
    });
   
  }

  ngOnInit() {
    
    this.getdataHome();
    this.sendTitle();
    this.functionCheckLogin();
  
    this.commonService.notifyOther({option: 'callTitle', value: 'Home'});

    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'callOpenMenu') {
        
        this.checkOpenMenu();
      }
  
    });
    
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
 
  checkOpenMenu(){
    this.clickOpen += 1;
    if(this.flags === false){
      if(this.clickOpen %2 ==0){
        this.nav.icon_val = "../../assets/image/icon_menu.png"
      }else{
        this.nav.icon_val = "../../assets/image/drop_up.png"
      }
      this.drawer.toggle();
    }else{
      alert("Please Login");
    }
  }
  functionCheckLogin(){
    if(localStorage.getItem('userName') ===''){
      this.flags = false;
    }else{
      this.flags = false;
    }
    
  }
  sendTitle(){
    this.nav.title = 'TODAY';
  }



  // connect MQTT
  private connectMQTT(){
    this._client = new Paho.MQTT.Client('10.199.15.95', 80, 'ng-mqttid-'+ this.makeid(8));
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
    for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    }
  // get message MQTT
  private getMessage(){
    this._client.onMessageArrived = (message: Paho.MQTT.Message) => {
      console.log(message);
      if (message.destinationName == 'MeteorologyInfo') {
      let obj: MyObj = JSON.parse(message.payloadString);
       this.setValueHome(obj.Rainfall,obj.WindVelocity,obj.WindDegree,obj.Humidity);
      this.setBackgound(obj.Humidity);
      this.fengshi = obj.WindVelocity;
      this.wendu = obj.Humidity;
      this.localtion = obj.Location;
      var digits = obj.Temperature.toString().split('.');
      this.shidu = parseInt(digits+"");
      
      }
     
      };
      

  }
  private onConnected():void {
    this._client.subscribe('MeteorologyInfo', {
      qos: 1
      });
     
    console.log('Connected to broker.');
  }

  async setValueHome(Rainfall:number,WindVelocity:number,WindDegree: number,Humidity:number){
   
     this.winds = [{
         name : this.translateService.instant("home.rainfall"), number: Rainfall, donvi: "mm", min: Rainfall +" mm",max: Rainfall +" mm"
     },
     {
      name :this.translateService.instant("home.windspeed"), number: WindVelocity, donvi: "km/h", min: WindVelocity +" km/h",max: WindVelocity +" km/h"
     },
     {
      name :this.translateService.instant("home.winddriction"), number: WindDegree, donvi: "km/h", min: WindDegree +" km/h",max: WindDegree +" km/h"
     },
     {
      name :this.translateService.instant("home.Humidity"), number: Humidity, donvi: "%", min: Humidity+" %",max: Humidity +" %"
     }
    ];
  }

  private getdataHome(){
    this.infoService.getinfoHomeV2(this.url_home).pipe(first()).subscribe(info => {      
      this.setValueHome(info.rainfall,info.windVelocity,info.windDegree,info.humidity);
      this.localtion = info.location;
      this.fengshi = info.windVelocity;
      this.wendu = info.humidity;
      var digits = info.temperature.toString().split('.');
      this.shidu = parseInt(digits+"");
      this.setBackgound(info.humidity);
    })
  }

  private setBackgound(humidity: number){
    if(humidity <=30){
      //this.imagSource = "../../assets/image/troinang.jpg";
      this.imageIcon = "../../assets/image/1.png";
    }else if(humidity <=40 && humidity >=31){
      //this.imagSource = "../../assets/image/trongxanh.jpg";
      this.imageIcon = "../../assets/image/2.png";
    }else if(humidity <=50 && humidity >=41){
      //this.imagSource = "../../assets/image/amu.jpg";
      this.imageIcon = "../../assets/image/5.png";
    }else if(humidity <=60 && humidity >=51){
     
     // this.imagSource = "../../assets/image/tiaset.gif";
      this.imageIcon = "../../assets/image/7.png";
    }else{
      
      this.imagSource = "../../assets/image/raingif.gif";
      this.imageIcon = "../../assets/image/3.png";
    }
  }

  private splitNumber(humidity : number,limit:number){
    return humidity.toString().split(".",limit);
  }
 
}




interface MyObj {
  Timestamp: Date;
  Location: string;
  WindVelocity:number;
  WindDegree: number;
  Humidity:number;
  Temperature:number;
  AtmosphericPressure:number;
  Rainfall:number;
  }