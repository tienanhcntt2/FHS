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

  private subscription: Subscription;

  // datecurrent
  today: number = Date.now();

  // menu 
  private clickOpen: number = 0;
  @ViewChild('drawer') drawer;
  @ViewChild(NavComponent)
  private nav: NavComponent;
  @ViewChild(SlideMenuComponent)
  private slide:SlideMenuComponent;

  public icon_val: string;
  public flags: boolean = false;
  public winds: Winds[] = [];
  private url_home: string = "http://10.199.15.95:80/mops/Meteorology/info";
  private _client: Paho.MQTT.Client;
  public localtion: String = "Ha Tinh";
  public shidu: number = 28;
  public wendu: number = 10;
  public fengxiang: String = "EAST";
  public fengshi: number = 30;

  private heightRigh: number;
  /**
   * change background
   */
  public imagSource: string = "assets/image/raingif.gif";
  public imageIcon: string = "assets/image/1.png";
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
    this.commonService.notifyOther({ option: 'callTitle', value: 'Home' });
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'callOpenMenu') {

        this.checkOpenMenu();
      }

    });
    this.getdataHome();
    this.commonService.notifyOther({ option: 'callTitle', value: 'Home' });
  }

  private checkOpenMenu() {
    this.clickOpen += 1;
      if (this.clickOpen % 2 == 0) {
        this.nav.icon_val = "assets/image/icon_menu.png"
      } else {
        this.nav.icon_val = "assets/image/drop_up.png"
      }
      this.drawer.toggle();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private  getToken(){
    if(this.auth.AccessToken.length >0){
      this.authService.savetoken(this.auth.AccessToken);
    }
  }
 
  sendTitle() {
    this.nav.title = this.translateService.instant("home.homepage");
    this.slide.numberPosition = 0;
    this.titleService.setTitle(this.translateService.instant("home.weather"));
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
      console.log(message);
      if (message.destinationName == 'MeteorologyInfo') {
        let obj: MyObj = JSON.parse(message.payloadString);
        this.setValueHome(obj.Rainfall, obj.WindVelocity, obj.WindDegree, obj.Humidity);
        this.setBackgound(obj.Humidity);
        this.fengshi = obj.WindVelocity;
        this.wendu = obj.Humidity;
        this.localtion = obj.Location;
        var digits = obj.Temperature.toString().split('.');
        this.shidu = parseInt(digits + "");

      }

    };


  }
  private onConnected(): void {
    this._client.subscribe('MeteorologyInfo', {
      qos: 1
    });

    console.log('Connected to broker.');
  }

  async setValueHome(Rainfall: number, WindVelocity: number, WindDegree: number, Humidity: number) {

    this.winds = [{
      name: this.translateService.instant("home.rainfall"), number: this.splitNumber(Rainfall), donvi: "mm", min: this.splitNumber(Rainfall) + " mm", max: this.splitNumber(Rainfall) + " mm", link:"/wind/rainfall"
    },
    {
      name: this.translateService.instant("home.speed"), number:this.splitNumber(WindVelocity) , donvi: "km/h", min: this.splitNumber(WindVelocity) + " km/h", max: this.splitNumber(WindVelocity) + " km/h", link:"/wind/speed"
    },
    {
      name: this.translateService.instant("home.winddriction"), number: this.splitNumber(WindDegree), donvi: "km/h", min: this.splitNumber(WindDegree) + " km/h", max: this.splitNumber(WindDegree) + " km/h", link:"/wind/direction"
    },
    {
      name: this.translateService.instant("home.Humidity"), number: this.splitNumber(Humidity), donvi: "%", min: this.splitNumber(Humidity) + " %", max: this.splitNumber(Humidity) + " %", link:"/wind/humidity"
    }
    ];
    
  }

  private getdataHome() {
    this.infoService.getinfoHomeV2(this.url_home).pipe(first()).subscribe(info => {
      this.setValueHome(info.rainfall, info.windVelocity, info.windDegree, info.humidity);
      this.localtion = info.location;
      this.fengshi = info.windVelocity;
      this.wendu = info.humidity;
      var digits = info.temperature.toString().split('.');
      this.shidu = parseInt(digits + "");
      this.setBackgound(info.humidity);
    })
  }

  private setBackgound(humidity: number) {
    if (humidity <= 30) {
      //this.imagSource = "../../assets/image/troinang.jpg";
      this.imageIcon = "assets/image/1.png";
    } else if (humidity <= 40 && humidity >= 31) {
      //this.imagSource = "../../assets/image/trongxanh.jpg";
      this.imageIcon = "assets/image/2.png";
    } else if (humidity <= 50 && humidity >= 41) {
      //this.imagSource = "../../assets/image/amu.jpg";
      this.imageIcon = "assets/image/5.png";
    } else if (humidity <= 60 && humidity >= 51) {

      // this.imagSource = "../../assets/image/tiaset.gif";
      this.imageIcon = "assets/image/7.png";
    } else {

      this.imagSource = "assets/image/raingif.gif";
      this.imageIcon = "assets/image/3.png";
    }
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
  openDialog(position: number): void {
    const dialogRef = this.dialog.open(DialogLoaddingComponent, {
      width: "auto",
      height: "auto",
      data: { name: this.name, animal: this.animal, key: position }, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}




interface MyObj {
  Timestamp: Date;
  Location: string;
  WindVelocity: number;
  WindDegree: number;
  Humidity: number;
  Temperature: number;
  AtmosphericPressure: number;
  Rainfall: number;
}