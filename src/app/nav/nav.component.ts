import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../service/CommonService';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ClockService } from '../service/ClockService';
import { FhsAuthorizeService } from '@fhs/authorize';
import { DialogLoaddingComponent } from '../dialog-loadding/dialog-loadding.component';
import { MatDialog } from '@angular/material';
import { AutherService } from '../service/autherService';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this._clockSubscription.unsubscribe();
  }
  private subscription: Subscription;


  // menu click open
  icon_val: string = "assets/image/icon_menu.png";
  title: string = "Home";
  public txt_start_date: string = "2019/03/03T00:00";
  public txt_end_date: string = "2019/03/03T00:30";
  public selectAdrees: string ="BUILD-D";
  private zhan: string ="16";
  private txt_zhan : string;

  // value nav
  public flagsShow: boolean = true;
  public showZhan: boolean = true;
  // value today
  private location: string ="BUILD-D";
  private dateCurrent : any;
  private TimerCurrent : Date;
  private timerOk : string;
  private _clockSubscription: Subscription;
  private animal: string;
  private  name: string;
  private today:string;

  constructor(private datePipe: DatePipe,private commoService: CommonService, private translateService: TranslateService,private clockService: ClockService,
    private auth:FhsAuthorizeService,public dialog: MatDialog, private authService:AutherService ) {
    translateService.onLangChange.subscribe((event: LangChangeEvent) => {

      this.selectAdrees = "BUILD-D";
      this.txt_zhan =translateService.instant("rainFall.station");
      this.today =translateService.instant("home.homepage");
    });
  }

  ngOnInit() {
    this.dateCurrent = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.txt_zhan =this.translateService.instant("rainFall.station");
    this.selectAdrees = this.location;
    this.today = this.translateService.instant("home.homepage");
    this.reviceData();
    this.showFunctionHeader();
    this._clockSubscription = this.clockService.getClock().subscribe(time => {
      this.TimerCurrent = time;
     
      this.timerOk = this.datePipe.transform(this.TimerCurrent,"HH:mm:ss");
      if(this.timerOk === "00:00:00"){
        this.dateCurrent = this.datePipe.transform(new Date(), "yyyy/MM/dd");
      }
    });
  }
  checkLogin() {
  
    if (this.authService.isUserLoggedIn()) {
      this.commoService.notifyOther({ option: 'callOpenMenu', value: 'openMenu' });
    } else {
      this.openDialog(2);
    }
    
  }
  showFunctionHeader() {
    //this.selectAdrees = this.translateService.instant("nav.adrress");
   
    if (this.title === "Home") {
      
      this.flagsShow = false;
      
    } else if(this.title == this.translateService.instant("home.windspeed")){
      this.showZhan = true;
      this.flagsShow = true;
    }else {
      this.flagsShow = true;
      this.showZhan = false;
    }
    
  }
  // nhan data
  reviceData() {
    this.subscription = this.commoService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'callIconMenu') {
        this.icon_val = res.value;

      } else if (res.hasOwnProperty('option') && res.option === 'sendTitle') {
        this.title = res.value;
        
        this.showFunctionHeader();
      } else if (res.hasOwnProperty('option') && res.option === 'dateSpeed') {
        this.txt_start_date = res.value;
      } else if (res.hasOwnProperty('option') && res.option === 'addreess') {
        //this.selectAdrees = res.value;
      } else if (res.hasOwnProperty('option') && res.option === 'selectzham') {
        this.zhan = res.value;
        this.txt_zhan = this.translateService.instant("rainFall.station");
      }

    });
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
