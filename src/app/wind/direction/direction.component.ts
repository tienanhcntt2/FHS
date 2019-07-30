import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/service/CommonService';
import { listMenu } from 'src/app/config/listmenu';
import { NavComponent } from 'src/app/nav/nav.component';
import { UserServicer } from 'src/app/service/user.Servicer';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { Fengxiang } from 'src/app/model/fengxiang';
@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer;

  @ViewChild('chart') chart;

  @ViewChild(NavComponent)
  private nav: NavComponent;

  
  private enDate: any;
  private startDate:any;
  public timeStart: Date = new Date();
  public timeEnd: Date = new Date();
  private timerCurrent: Date = new Date();
  private fplagStart: boolean = true;
  private fplagEnd: boolean = true;

  private subscription: Subscription;
  public show: boolean = true;
  public numberCheck: number = 0;
  public nameMaticon: string = "assets/image/drop_down.png";


  private clickOpen: number = 0;

  public okma :boolean = true;

  // menu
  listmenu = listMenu;
  
  /**
   * select date and timer
   */
  private txt_date_start: string;
  private txt_date_end: string;
  private txt_time_start: any;
  private txt_time_end: any;

  private selectToday : Date;

  /**
   * constructor direction
   * @param commoService 
   * @param router 
   * @param datePipe 
   * @param formBuilder 
   * @param httpClient 
   * @param userService 
   */
  constructor(private commoService: CommonService,  private datePipe: DatePipe,
    private userService: UserServicer,private translate:TranslateService, private intl: IntlService ) {
      translate.onLangChange.subscribe((event: LangChangeEvent) => {
     
        this.sendTitle();
      });
      this.selectToday = new Date();
      let date = new Date();
      this.enDate = new Date();
      this.startDate =  new Date(this.datePipe.transform(date.setDate(date.getDate() - 6)));
  }
/* ---------------------------------------------------
    onInit
    ----------------------------------------------------- */
  ngOnInit() {
    this.nav.showZhan = false;
    this.sendTitle();
    this.txt_time_start = this.formatValue(this.timeStart) + ":00";
    this.timeEnd.setMinutes(this.timeEnd.getMinutes() +30);
    this.txt_time_end = this.formatValue(this.timeEnd) +":00";
    // check login
    this.userService.chienchalogin();

    this.txt_date_start = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.txt_date_end = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.setValueDatetimer(this.txt_date_start,this.txt_date_end,this.txt_time_start,this.txt_time_end);

    this.subscription = this.commoService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'callOpenMenu') {
        this.checkOpenMenu();
      }

    });

  }
  /* ---------------------------------------------------
    printf
    ----------------------------------------------------- */
private printfChart(){
  this.chart.instance.print();

}
 /* ---------------------------------------------------
    ngOnDestroy
    ----------------------------------------------------- */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
 /* ---------------------------------------------------
    Detail
    ----------------------------------------------------- */
  showDetail() {

    this.numberCheck += 1;
    if (this.numberCheck % 2 == 0) {
      this.show = true;
      this.nameMaticon = "/assets/image/drop_down.png"
    } else {
      this.show = false;
      this.nameMaticon = "/assets/image/drop_up.png"
    }
  }
/**
   * event click change date when select
   * @param value 
   */
  onChangeStartDay(value: Date) {
    
    this.txt_date_start = this.datePipe.transform(value, "yyyy/MM/dd");
    if(this.txt_date_start === this.datePipe.transform(new Date(), "yyyy/MM/dd")){
      this.fplagStart = false;
    }else{
      this.fplagStart = true;
    }
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
  }

  /**
   * end date
   * @param value 
   */
  onChangeEndDay(value: Date) {
    this.txt_date_end = this.datePipe.transform(value, "yyyy/MM/dd");
    if(this.txt_date_end === this.datePipe.transform(new Date(), "yyyy/MM/dd")){
      this.fplagEnd = true;
    }else{
      this.fplagEnd = false;
    }
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
   
  }

/**
   * on change timer start
   * @param value 
   */
  onChangeTimerStart(value: Date){
    this.txt_time_start = this.formatValue(value) + ":00";
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
  }
  /**
   * change timer end
   * @param value 
   */
  onChangeTimerEnd(value: Date){
    this.txt_time_end = this.formatValue(value) + ":00";
    this.setValueDatetimer(this.txt_date_start, this.txt_date_end, this.txt_time_start, this.txt_time_end);
  }
  /**
   * formar timer
   */
  private formatValue(value?: Date): string {
    return value ? `${this.intl.formatDate(value, 'HH:mm')}` : '';
  }
 
  /* ---------------------------------------------------
    check menu
    ----------------------------------------------------- */
  checkOpenMenu() {
    this.clickOpen += 1;
    if (this.clickOpen % 2 == 0) {
      this.nav.icon_val = "/assets/image/icon_menu.png"
    } else {
      this.nav.icon_val = "/assets/image/drop_up.png"
    }
  
    this.drawer.toggle();
  }
/* ---------------------------------------------------
    Send title
    ----------------------------------------------------- */
  sendTitle() {
    this.nav.title =this.translate.instant("home.winddriction");
  }


  // function show and hide
  numbercheckShow : number = 0;
  widthleft: number = 60;
  widthright: number = 40;
  public icon_show: string ="/assets/image/icon_hiden.png";
  functionShowHide(){
    this.numbercheckShow += 1;
    if(this.numbercheckShow %2 ==0 ){
      this.okma = true;
      this.widthleft = 60;
      this.widthright = 40;
      this.icon_show ="/assets/image/icon_hiden.png";
    }else{
      this.okma = false;
      this.widthleft = 97;
      this.widthright = 3;
      this.icon_show ="../../assets/image/icon_show.png";
    }
  }
  /**
   * set value input for nav
   * @param dayStart 
   * @param dayEnd 
   * @param timerStart 
   * @param timerEnd 
   */
  private setValueDatetimer(dayStart:string,dayEnd:string,timerStart:string,timerEnd:string){
    this.nav.txt_start_date = dayStart +"T"+timerStart;
    this.nav.txt_end_date = dayEnd +"T" +timerEnd;

  }
  customizeText = (arg: any) => {
    let value = new Date(arg.value);
    if (arg.valueText.length < 2) {
        // console.log(arg.valueText);
        // console.log(value.toLocaleString());
        arg.valueText = value.toLocaleString().split(' ')[1];
        // console.log(arg.valueText);
    }
    else if (arg.valueText.length > 8) {
       
        let temp = arg.valueText.split(' ');
        
        arg.valueText = temp[1] + temp[2];
    }
    return arg.valueText;
}
valueCustomizeText(arg: any) {
    console.log(arg.value);
    switch (true) {
        case arg.value > 350: {
            arg.valueText = '360';
            break;
        }
        case arg.value > 300: {
            arg.valueText = '315';
            break;
        }
        case arg.value > 250: {
            arg.valueText = '270';
            break;
        }
        case arg.value > 200: {
            arg.valueText = '225';
            break;
        }
        case arg.value > 150: {
            arg.valueText = '180';
            break;
        }
        case arg.value > 100: {
            arg.valueText = '135';
            break;
        }
        case arg.value > 50: {
            arg.valueText = '90';
            break;
        }
        case arg.value > 0: {
            arg.valueText = '45';
            break;
        }
        case arg.value == 0: {
            arg.valueText = '0';
            break;
        }
    }
    //    
    return arg.valueText;
}
stockPrices: Fengxiang[] = [
    {
        timestamp: new Date('2019-07-08T10:02:00Z'),
        direction: 252
    },
    {
        timestamp: new Date('2019-07-08T10:03:00Z'),
        direction: 234
    },
    {
        timestamp: new Date('2019-07-08T10:04:00Z'),
        direction: 249.7
    },
    {
        timestamp: new Date('2019-07-08T10:05:00Z'),
        direction: 225.3
    },
    {
        timestamp: new Date('2019-07-08T10:06:00Z'),
        direction: 224.3
    },
    {
        timestamp: new Date('2019-07-08T10:07:00Z'),
        direction: 194.8
    },
    {
        timestamp: new Date('2019-07-08T10:08:00Z'),
        direction: 211.4
    },
    {
        timestamp: new Date('2019-07-08T10:09:00Z'),
        direction: 248
    },
    {
        timestamp: new Date('2019-07-08T10:10:00Z'),
        direction: 224.5
    },
    {
        timestamp: new Date('2019-07-08T10:11:00Z'),
        direction: 218.1
    },
    {
        timestamp: new Date('2019-07-08T10:12:00Z'),
        direction: 237.8
    },
    {
        timestamp: new Date('2019-07-08T10:13:00Z'),
        direction: 240.2
    },
    {
        timestamp: new Date('2019-07-08T10:14:00Z'),
        direction: 230.8
    },
    {
        timestamp: new Date('2019-07-08T10:15:00Z'),
        direction: 225.7
    },
    {
        timestamp: new Date('2019-07-08T10:16:00Z'),
        direction: 224.2
    },
    {
        timestamp: new Date('2019-07-08T10:17:00Z'),
        direction: 209.3
    },
    {
        timestamp: new Date('2019-07-08T10:18:00Z'),
        direction: 207.9
    },
    {
        timestamp: new Date('2019-07-08T10:19:00Z'),
        direction: 223.3
    },
    {
        timestamp: new Date('2019-07-08T10:20:00Z'),
        direction: 219.1
    },
    {
        timestamp: new Date('2019-07-08T10:21:00Z'),
        direction: 207.1
    },
    {
        timestamp: new Date('2019-07-08T10:22:00Z'),
        direction: 238.3
    },
    {
        timestamp: new Date('2019-07-08T10:23:00Z'),
        direction: 244.1
    },
    {
        timestamp: new Date('2019-07-08T10:24:00Z'),
        direction: 241.8
    },
    {
        timestamp: new Date('2019-07-08T10:25:00Z'),
        direction: 256
    },
    {
        timestamp: new Date('2019-07-08T10:26:00Z'),
        direction: 240.8
    },
    {
        timestamp: new Date('2019-07-08T10:27:00Z'),
        direction: 216.8
    },
    {
        timestamp: new Date('2019-07-08T10:28:00Z'),
        direction: 243.9
    },
    {
        timestamp: new Date('2019-07-08T10:29:00Z'),
        direction: 231.7
    },
    {
        timestamp: new Date('2019-07-08T10:30:00Z'),
        direction: 246.8
    },
    {
        timestamp: new Date('2019-07-08T10:31:00Z'),
        direction: 239.2
    },
    {
        timestamp: new Date('2019-07-08T10:32:00Z'),
        direction: 246.8
    },
    {
        timestamp: new Date('2019-07-08T10:33:00Z'),
        direction: 232.9
    },
    {
        timestamp: new Date('2019-07-08T10:34:00Z'),
        direction: 212.2
    },
    {
        timestamp: new Date('2019-07-08T10:35:00Z'),
        direction: 200.8
    },
    {
        timestamp: new Date('2019-07-08T10:36:00Z'),
        direction: 214.4
    },
    {
        timestamp: new Date('2019-07-08T10:37:00Z'),
        direction: 222.4
    },
    {
        timestamp: new Date('2019-07-08T10:38:00Z'),
        direction: 244.8
    },
    {
        timestamp: new Date('2019-07-08T10:39:00Z'),
        direction: 246.2
    },
    {
        timestamp: new Date('2019-07-08T10:40:00Z'),
        direction: 230.9
    },
    {
        timestamp: new Date('2019-07-08T10:41:00Z'),
        direction: 213.4
    },
    {
        timestamp: new Date('2019-07-08T10:42:00Z'),
        direction: 206.5
    },
    {
        timestamp: new Date('2019-07-08T10:43:00Z'),
        direction: 226.7
    },
    {
        timestamp: new Date('2019-07-08T10:44:00Z'),
        direction: 241.2
    },
    {
        timestamp: new Date('2019-07-08T10:45:00Z'),
        direction: 236
    },
    {
        timestamp: new Date('2019-07-08T10:46:00Z'),
        direction: 219.1
    },
    {
        timestamp: new Date('2019-07-08T10:47:00Z'),
        direction: 216.5
    },
    {
        timestamp: new Date('2019-07-08T10:48:00Z'),
        direction: 249.6
    },
    {
        timestamp: new Date('2019-07-08T10:49:00Z'),
        direction: 220
    },
    {
        timestamp: new Date('2019-07-08T10:50:00Z'),
        direction: 214.2
    },
    {
        timestamp: new Date('2019-07-08T10:51:00Z'),
        direction: 217.8
    },
    {
        timestamp: new Date('2019-07-08T10:52:00Z'),
        direction: 202.6
    },
    {
        timestamp: new Date('2019-07-08T10:53:00Z'),
        direction: 227.9
    },
    {
        timestamp: new Date('2019-07-08T10:54:00Z'),
        direction: 263.8
    },
    {
        timestamp: new Date('2019-07-08T10:55:00Z'),
        direction: 212.8
    },
    {
        timestamp: new Date('2019-07-08T10:56:00Z'),
        direction: 212.1
    },
    {
        timestamp: new Date('2019-07-08T10:57:00Z'),
        direction: 233.6
    },
    {
        timestamp: new Date('2019-07-08T10:58:00Z'),
        direction: 241.6
    },
    {
        timestamp: new Date('2019-07-08T10:59:00Z'),
        direction: 243.2
    },
    {
        timestamp: new Date('2019-07-08T11:00:00Z'),
        direction: 241.3
    },
    {
        timestamp: new Date('2019-07-08T11:01:00Z'),
        direction: 246.6
    },
    {
        timestamp: new Date('2019-07-08T11:02:00Z'),
        direction: 241.8
    },
    {
        timestamp: new Date('2019-07-08T11:03:00Z'),
        direction: 238
    },
    {
        timestamp: new Date('2019-07-08T11:04:00Z'),
        direction: 246.2
    },
    {
        timestamp: new Date('2019-07-08T11:05:00Z'),
        direction: 243.3
    },
    {
        timestamp: new Date('2019-07-08T11:06:00Z'),
        direction: 242.7
    },
    {
        timestamp: new Date('2019-07-08T11:07:00Z'),
        direction: 245.2
    },
    {
        timestamp: new Date('2019-07-08T11:08:00Z'),
        direction: 239.8
    },
    {
        timestamp: new Date('2019-07-08T11:09:00Z'),
        direction: 235.1
    },
    {
        timestamp: new Date('2019-07-08T11:10:00Z'),
        direction: 239.2
    },
    {
        timestamp: new Date('2019-07-08T11:11:00Z'),
        direction: 235.1
    },
    {
        timestamp: new Date('2019-07-08T11:12:00Z'),
        direction: 238.2
    },
    {
        timestamp: new Date('2019-07-08T11:13:00Z'),
        direction: 237.5
    },
    {
        timestamp: new Date('2019-07-08T11:14:00Z'),
        direction: 242.4
    },
    {
        timestamp: new Date('2019-07-08T11:15:00Z'),
        direction: 238.5
    },
    {
        timestamp: new Date('2019-07-08T11:16:00Z'),
        direction: 231
    },
    {
        timestamp: new Date('2019-07-08T11:17:00Z'),
        direction: 245.1
    },
    {
        timestamp: new Date('2019-07-08T11:18:00Z'),
        direction: 242
    },
    {
        timestamp: new Date('2019-07-08T11:19:00Z'),
        direction: 244.2
    },
    {
        timestamp: new Date('2019-07-08T11:20:00Z'),
        direction: 237.4
    },
    {
        timestamp: new Date('2019-07-08T11:21:00Z'),
        direction: 226.9
    },
    {
        timestamp: new Date('2019-07-08T11:22:00Z'),
        direction: 239.5
    },
    {
        timestamp: new Date('2019-07-08T11:23:00Z'),
        direction: 241.6
    },
    {
        timestamp: new Date('2019-07-08T11:24:00Z'),
        direction: 231.7
    },
    {
        timestamp: new Date('2019-07-08T11:25:00Z'),
        direction: 246.4
    },
    {
        timestamp: new Date('2019-07-08T11:26:00Z'),
        direction: 233.3
    },
    {
        timestamp: new Date('2019-07-08T11:27:00Z'),
        direction: 248
    },
    {
        timestamp: new Date('2019-07-08T11:28:00Z'),
        direction: 245.6
    },
    {
        timestamp: new Date('2019-07-08T11:29:00Z'),
        direction: 245.9
    },
    {
        timestamp: new Date('2019-07-08T11:30:00Z'),
        direction: 248
    },
    {
        timestamp: new Date('2019-07-08T11:31:00Z'),
        direction: 251.8
    },
    {
        timestamp: new Date('2019-07-08T11:32:00Z'),
        direction: 249.7
    },
    {
        timestamp: new Date('2019-07-08T11:33:00Z'),
        direction: 258.5
    },
    {
        timestamp: new Date('2019-07-08T11:34:00Z'),
        direction: 247.4
    },
    {
        timestamp: new Date('2019-07-08T11:35:00Z'),
        direction: 247.3
    },
    {
        timestamp: new Date('2019-07-08T11:36:00Z'),
        direction: 245.7
    },
    {
        timestamp: new Date('2019-07-08T11:37:00Z'),
        direction: 232.4
    },
    {
        timestamp: new Date('2019-07-08T11:38:00Z'),
        direction: 217.7
    },
    {
        timestamp: new Date('2019-07-08T11:39:00Z'),
        direction: 239.7
    },
    {
        timestamp: new Date('2019-07-08T11:40:00Z'),
        direction: 208
    },
    {
        timestamp: new Date('2019-07-08T11:41:00Z'),
        direction: 201.5
    },
    {
        timestamp: new Date('2019-07-08T11:42:00Z'),
        direction: 238.1
    },
    {
        timestamp: new Date('2019-07-08T11:43:00Z'),
        direction: 249.1
    },
    {
        timestamp: new Date('2019-07-08T11:44:00Z'),
        direction: 241.4
    },
    {
        timestamp: new Date('2019-07-08T11:45:00Z'),
        direction: 236.6
    },
    {
        timestamp: new Date('2019-07-08T11:46:00Z'),
        direction: 242.7
    },
    {
        timestamp: new Date('2019-07-08T11:47:00Z'),
        direction: 241.7
    },
    {
        timestamp: new Date('2019-07-08T11:48:00Z'),
        direction: 229.1
    },
    {
        timestamp: new Date('2019-07-08T11:49:00Z'),
        direction: 249.5
    },
    {
        timestamp: new Date('2019-07-08T11:50:00Z'),
        direction: 236.7
    },
    {
        timestamp: new Date('2019-07-08T11:51:00Z'),
        direction: 235.4
    },
    {
        timestamp: new Date('2019-07-08T11:52:00Z'),
        direction: 236
    },
    {
        timestamp: new Date('2019-07-08T11:53:00Z'),
        direction: 239.8
    },
    {
        timestamp: new Date('2019-07-08T11:54:00Z'),
        direction: 240.7
    },
    {
        timestamp: new Date('2019-07-08T11:55:00Z'),
        direction: 221.7
    },
    {
        timestamp: new Date('2019-07-08T11:56:00Z'),
        direction: 243.5
    },
    {
        timestamp: new Date('2019-07-08T11:57:00Z'),
        direction: 244.8
    },
    {
        timestamp: new Date('2019-07-08T11:58:00Z'),
        direction: 239.3
    },
    {
        timestamp: new Date('2019-07-08T11:59:00Z'),
        direction: 239.4
    },
    {
        timestamp: new Date('2019-07-08T12:00:00Z'),
        direction: 238.1
    },
    {
        timestamp: new Date('2019-07-08T12:01:00Z'),
        direction: 226.3
    },
    {
        timestamp: new Date('2019-07-08T12:02:00Z'),
        direction: 244.7
    },
    {
        timestamp: new Date('2019-07-08T12:03:00Z'),
        direction: 243.7
    },
    {
        timestamp: new Date('2019-07-08T12:04:00Z'),
        direction: 240.8
    },
    {
        timestamp: new Date('2019-07-08T12:05:00Z'),
        direction: 239.2
    },
    {
        timestamp: new Date('2019-07-08T12:06:00Z'),
        direction: 236.1
    },
    {
        timestamp: new Date('2019-07-08T12:07:00Z'),
        direction: 240.3
    },
    {
        timestamp: new Date('2019-07-08T12:08:00Z'),
        direction: 238.4
    },
    {
        timestamp: new Date('2019-07-08T12:09:00Z'),
        direction: 246
    },
    {
        timestamp: new Date('2019-07-08T12:10:00Z'),
        direction: 239.1
    },
    {
        timestamp: new Date('2019-07-08T12:11:00Z'),
        direction: 241.6
    },
    {
        timestamp: new Date('2019-07-08T12:12:00Z'),
        direction: 244.1
    },
    {
        timestamp: new Date('2019-07-08T12:13:00Z'),
        direction: 240.7
    },
    {
        timestamp: new Date('2019-07-08T12:14:00Z'),
        direction: 237.9
    },
    {
        timestamp: new Date('2019-07-08T12:15:00Z'),
        direction: 241.6
    },
    {
        timestamp: new Date('2019-07-08T12:16:00Z'),
        direction: 235.7
    },
    {
        timestamp: new Date('2019-07-08T12:17:00Z'),
        direction: 236.2
    },
    {
        timestamp: new Date('2019-07-08T12:18:00Z'),
        direction: 240.2
    },
    {
        timestamp: new Date('2019-07-08T12:19:00Z'),
        direction: 231.4
    },
    {
        timestamp: new Date('2019-07-08T12:20:00Z'),
        direction: 237.4
    },
    {
        timestamp: new Date('2019-07-08T12:21:00Z'),
        direction: 243.2
    },
    {
        timestamp: new Date('2019-07-08T12:22:00Z'),
        direction: 234.1
    },
    {
        timestamp: new Date('2019-07-08T12:23:00Z'),
        direction: 239.1
    },
    {
        timestamp: new Date('2019-07-08T12:24:00Z'),
        direction: 251.6
    },
    {
        timestamp: new Date('2019-07-08T12:25:00Z'),
        direction: 244.8
    },
    {
        timestamp: new Date('2019-07-08T12:26:00Z'),
        direction: 253.6
    },
    {
        timestamp: new Date('2019-07-08T12:27:00Z'),
        direction: 232.1
    },
    {
        timestamp: new Date('2019-07-08T12:28:00Z'),
        direction: 244.3
    },
    {
        timestamp: new Date('2019-07-08T12:29:00Z'),
        direction: 241.1
    },
    {
        timestamp: new Date('2019-07-08T12:30:00Z'),
        direction: 243.5
    },
    {
        timestamp: new Date('2019-07-08T12:31:00Z'),
        direction: 234.6
    },
    {
        timestamp: new Date('2019-07-08T12:32:00Z'),
        direction: 241.7
    },
    {
        timestamp: new Date('2019-07-08T12:33:00Z'),
        direction: 238.8
    },
    {
        timestamp: new Date('2019-07-08T12:34:00Z'),
        direction: 233.6
    },
    {
        timestamp: new Date('2019-07-08T12:35:00Z'),
        direction: 239
    },
    {
        timestamp: new Date('2019-07-08T12:36:00Z'),
        direction: 239.3
    },
    {
        timestamp: new Date('2019-07-08T12:37:00Z'),
        direction: 236.3
    },
    {
        timestamp: new Date('2019-07-08T12:38:00Z'),
        direction: 241.9
    },
    {
        timestamp: new Date('2019-07-08T12:39:00Z'),
        direction: 230.7
    },
    {
        timestamp: new Date('2019-07-08T12:40:00Z'),
        direction: 245
    },
    {
        timestamp: new Date('2019-07-08T12:41:00Z'),
        direction: 236.7
    },
    {
        timestamp: new Date('2019-07-08T12:42:00Z'),
        direction: 242.2
    },
    {
        timestamp: new Date('2019-07-08T12:43:00Z'),
        direction: 243.3
    },
    {
        timestamp: new Date('2019-07-08T12:44:00Z'),
        direction: 237
    },
    {
        timestamp: new Date('2019-07-08T12:45:00Z'),
        direction: 235.7
    },
    {
        timestamp: new Date('2019-07-08T12:46:00Z'),
        direction: 241.8
    },
    {
        timestamp: new Date('2019-07-08T12:47:00Z'),
        direction: 241.7
    },
    {
        timestamp: new Date('2019-07-08T12:48:00Z'),
        direction: 247
    },
    {
        timestamp: new Date('2019-07-08T12:49:00Z'),
        direction: 242.6
    },
    {
        timestamp: new Date('2019-07-08T12:50:00Z'),
        direction: 242.3
    },
    {
        timestamp: new Date('2019-07-08T12:51:00Z'),
        direction: 245
    },
    {
        timestamp: new Date('2019-07-08T12:52:00Z'),
        direction: 243.8
    },
    {
        timestamp: new Date('2019-07-08T12:53:00Z'),
        direction: 236.2
    },
    {
        timestamp: new Date('2019-07-08T12:54:00Z'),
        direction: 244.8
    },
    {
        timestamp: new Date('2019-07-08T12:55:00Z'),
        direction: 251
    },
    {
        timestamp: new Date('2019-07-08T12:56:00Z'),
        direction: 253.1
    },
    {
        timestamp: new Date('2019-07-08T12:57:00Z'),
        direction: 245.2
    },
    {
        timestamp: new Date('2019-07-08T12:58:00Z'),
        direction: 238.4
    },
    {
        timestamp: new Date('2019-07-08T12:59:00Z'),
        direction: 243.6
    },
    {
        timestamp: new Date('2019-07-08T13:00:00Z'),
        direction: 230.2
    },
    {
        timestamp: new Date('2019-07-08T13:01:00Z'),
        direction: 245.7
    },
    {
        timestamp: new Date('2019-07-08T13:02:00Z'),
        direction: 246.3
    },
    {
        timestamp: new Date('2019-07-08T13:03:00Z'),
        direction: 245.6
    },
    {
        timestamp: new Date('2019-07-08T13:04:00Z'),
        direction: 236.4
    },
    {
        timestamp: new Date('2019-07-08T13:05:00Z'),
        direction: 237.8
    },
    {
        timestamp: new Date('2019-07-08T13:06:00Z'),
        direction: 248
    },
    {
        timestamp: new Date('2019-07-08T13:07:00Z'),
        direction: 246.5
    },
    {
        timestamp: new Date('2019-07-08T13:08:00Z'),
        direction: 225.7
    },
    {
        timestamp: new Date('2019-07-08T13:09:00Z'),
        direction: 247.8
    },
    {
        timestamp: new Date('2019-07-08T13:10:00Z'),
        direction: 237
    },
    {
        timestamp: new Date('2019-07-08T13:11:00Z'),
        direction: 245.5
    },
    {
        timestamp: new Date('2019-07-08T13:12:00Z'),
        direction: 243.2
    },
    {
        timestamp: new Date('2019-07-08T13:13:00Z'),
        direction: 263.6
    },
    {
        timestamp: new Date('2019-07-08T13:14:00Z'),
        direction: 263.1
    },
    {
        timestamp: new Date('2019-07-08T13:15:00Z'),
        direction: 242.2
    },
    {
        timestamp: new Date('2019-07-08T13:16:00Z'),
        direction: 249.3
    },
    {
        timestamp: new Date('2019-07-08T13:17:00Z'),
        direction: 250.5
    },
    {
        timestamp: new Date('2019-07-08T13:18:00Z'),
        direction: 239.3
    },
    {
        timestamp: new Date('2019-07-08T13:19:00Z'),
        direction: 228.9
    },
    {
        timestamp: new Date('2019-07-08T13:20:00Z'),
        direction: 235.8
    },
    {
        timestamp: new Date('2019-07-08T13:21:00Z'),
        direction: 239.3
    },
    {
        timestamp: new Date('2019-07-08T13:22:00Z'),
        direction: 248.4
    },
    {
        timestamp: new Date('2019-07-08T13:23:00Z'),
        direction: 240.1
    },
    {
        timestamp: new Date('2019-07-08T13:24:00Z'),
        direction: 249
    },
    {
        timestamp: new Date('2019-07-08T13:25:00Z'),
        direction: 262.4
    },
    {
        timestamp: new Date('2019-07-08T13:26:00Z'),
        direction: 250.1
    },
    {
        timestamp: new Date('2019-07-08T13:27:00Z'),
        direction: 240.2
    },
    {
        timestamp: new Date('2019-07-08T13:28:00Z'),
        direction: 237.1
    },
    {
        timestamp: new Date('2019-07-08T13:29:00Z'),
        direction: 248.6
    },
    {
        timestamp: new Date('2019-07-08T13:30:00Z'),
        direction: 264.6
    },
    {
        timestamp: new Date('2019-07-08T13:31:00Z'),
        direction: 260.9
    },
    {
        timestamp: new Date('2019-07-08T13:32:00Z'),
        direction: 234
    },
    {
        timestamp: new Date('2019-07-08T13:33:00Z'),
        direction: 230
    },
    {
        timestamp: new Date('2019-07-08T13:34:00Z'),
        direction: 251.4
    },
    {
        timestamp: new Date('2019-07-08T13:35:00Z'),
        direction: 249.5
    },
    {
        timestamp: new Date('2019-07-08T13:36:00Z'),
        direction: 262.3
    },
    {
        timestamp: new Date('2019-07-08T13:37:00Z'),
        direction: 262.9
    },
    {
        timestamp: new Date('2019-07-08T13:38:00Z'),
        direction: 245.5
    },
    {
        timestamp: new Date('2019-07-08T13:39:00Z'),
        direction: 242
    },
    {
        timestamp: new Date('2019-07-08T13:40:00Z'),
        direction: 245.3
    },
    {
        timestamp: new Date('2019-07-08T13:41:00Z'),
        direction: 249.3
    },
    {
        timestamp: new Date('2019-07-08T13:42:00Z'),
        direction: 245.3
    },
    {
        timestamp: new Date('2019-07-08T13:43:00Z'),
        direction: 243.2
    },
    {
        timestamp: new Date('2019-07-08T13:44:00Z'),
        direction: 242.6
    },
    {
        timestamp: new Date('2019-07-08T13:45:00Z'),
        direction: 258.2
    },
    {
        timestamp: new Date('2019-07-08T13:46:00Z'),
        direction: 239
    },
    {
        timestamp: new Date('2019-07-08T13:47:00Z'),
        direction: 265.3
    },
    {
        timestamp: new Date('2019-07-08T13:48:00Z'),
        direction: 261.8
    },
    {
        timestamp: new Date('2019-07-08T13:49:00Z'),
        direction: 263.9
    },
    {
        timestamp: new Date('2019-07-08T13:50:00Z'),
        direction: 250
    },
    {
        timestamp: new Date('2019-07-08T13:51:00Z'),
        direction: 277.5
    },
    {
        timestamp: new Date('2019-07-08T13:52:00Z'),
        direction: 289.4
    },
    {
        timestamp: new Date('2019-07-08T13:53:00Z'),
        direction: 281.7
    },
    {
        timestamp: new Date('2019-07-08T13:54:00Z'),
        direction: 202.4
    },
    {
        timestamp: new Date('2019-07-08T13:55:00Z'),
        direction: 255.4
    },
    {
        timestamp: new Date('2019-07-08T13:56:00Z'),
        direction: 238.3
    },
    {
        timestamp: new Date('2019-07-08T13:57:00Z'),
        direction: 235.5
    },
    {
        timestamp: new Date('2019-07-08T13:58:00Z'),
        direction: 236.8
    },
    {
        timestamp: new Date('2019-07-08T13:59:00Z'),
        direction: 241.2
    },
    {
        timestamp: new Date('2019-07-08T14:00:00Z'),
        direction: 233.2
    },
    {
        timestamp: new Date('2019-07-08T14:01:00Z'),
        direction: 238.9
    },
    {
        timestamp: new Date('2019-07-08T14:02:00Z'),
        direction: 238.2
    },
    {
        timestamp: new Date('2019-07-08T14:03:00Z'),
        direction: 234.8
    },
    {
        timestamp: new Date('2019-07-08T14:04:00Z'),
        direction: 243.3
    },
    {
        timestamp: new Date('2019-07-08T14:05:00Z'),
        direction: 251.7
    },
    {
        timestamp: new Date('2019-07-08T14:06:00Z'),
        direction: 244.7
    },
    {
        timestamp: new Date('2019-07-08T14:07:00Z'),
        direction: 247.4
    },
    {
        timestamp: new Date('2019-07-08T14:08:00Z'),
        direction: 255.3
    },
    {
        timestamp: new Date('2019-07-08T14:09:00Z'),
        direction: 252
    },
    {
        timestamp: new Date('2019-07-08T14:10:00Z'),
        direction: 246.9
    },
    {
        timestamp: new Date('2019-07-08T14:11:00Z'),
        direction: 256.3
    },
    {
        timestamp: new Date('2019-07-08T14:12:00Z'),
        direction: 254.4
    },
    {
        timestamp: new Date('2019-07-08T14:13:00Z'),
        direction: 261.2
    },
    {
        timestamp: new Date('2019-07-08T14:14:00Z'),
        direction: 263.6
    },
    {
        timestamp: new Date('2019-07-08T14:15:00Z'),
        direction: 254.3
    },
    {
        timestamp: new Date('2019-07-08T14:16:00Z'),
        direction: 245.9
    },
    {
        timestamp: new Date('2019-07-08T14:17:00Z'),
        direction: 236.4
    },
    {
        timestamp: new Date('2019-07-08T14:18:00Z'),
        direction: 257.3
    },
    {
        timestamp: new Date('2019-07-08T14:19:00Z'),
        direction: 261.7
    },
    {
        timestamp: new Date('2019-07-08T14:20:00Z'),
        direction: 251.1
    },
    {
        timestamp: new Date('2019-07-08T14:21:00Z'),
        direction: 253.6
    },
    {
        timestamp: new Date('2019-07-08T14:22:00Z'),
        direction: 261
    },
    {
        timestamp: new Date('2019-07-08T14:23:00Z'),
        direction: 248.7
    },
    {
        timestamp: new Date('2019-07-08T14:24:00Z'),
        direction: 254.3
    },
    {
        timestamp: new Date('2019-07-08T14:25:00Z'),
        direction: 248.6
    },
    {
        timestamp: new Date('2019-07-08T14:26:00Z'),
        direction: 238.5
    },
    {
        timestamp: new Date('2019-07-08T14:27:00Z'),
        direction: 254.5
    },
    {
        timestamp: new Date('2019-07-08T14:28:00Z'),
        direction: 256.7
    },
    {
        timestamp: new Date('2019-07-08T14:29:00Z'),
        direction: 244.6
    },
    {
        timestamp: new Date('2019-07-08T14:30:00Z'),
        direction: 250.1
    },
    {
        timestamp: new Date('2019-07-08T14:31:00Z'),
        direction: 254.1
    },
    {
        timestamp: new Date('2019-07-08T14:32:00Z'),
        direction: 252.1
    },
    {
        timestamp: new Date('2019-07-08T14:33:00Z'),
        direction: 240.6
    },
    {
        timestamp: new Date('2019-07-08T14:34:00Z'),
        direction: 255.8
    },
    {
        timestamp: new Date('2019-07-08T14:35:00Z'),
        direction: 263.4
    },
    {
        timestamp: new Date('2019-07-08T14:36:00Z'),
        direction: 247.3
    },
    {
        timestamp: new Date('2019-07-08T14:37:00Z'),
        direction: 248.9
    },
    {
        timestamp: new Date('2019-07-08T14:38:00Z'),
        direction: 251.6
    },
    {
        timestamp: new Date('2019-07-08T14:39:00Z'),
        direction: 253.8
    },
    {
        timestamp: new Date('2019-07-08T14:40:00Z'),
        direction: 266
    },
    {
        timestamp: new Date('2019-07-08T14:41:00Z'),
        direction: 243.8
    },
    {
        timestamp: new Date('2019-07-08T14:42:00Z'),
        direction: 252.6
    },
    {
        timestamp: new Date('2019-07-08T14:43:00Z'),
        direction: 253.8
    },
    {
        timestamp: new Date('2019-07-08T14:44:00Z'),
        direction: 243.7
    },
    {
        timestamp: new Date('2019-07-08T14:45:00Z'),
        direction: 250.6
    },
    {
        timestamp: new Date('2019-07-08T14:46:00Z'),
        direction: 244.4
    },
    {
        timestamp: new Date('2019-07-08T14:47:00Z'),
        direction: 261.9
    },
    {
        timestamp: new Date('2019-07-08T14:48:00Z'),
        direction: 261.8
    },
    {
        timestamp: new Date('2019-07-08T14:49:00Z'),
        direction: 249.1
    },
    {
        timestamp: new Date('2019-07-08T14:50:00Z'),
        direction: 266.7
    },
    {
        timestamp: new Date('2019-07-08T14:51:00Z'),
        direction: 258.3
    },
    {
        timestamp: new Date('2019-07-08T14:52:00Z'),
        direction: 250.5
    },
    {
        timestamp: new Date('2019-07-08T14:53:00Z'),
        direction: 251.2
    },
    {
        timestamp: new Date('2019-07-08T14:54:00Z'),
        direction: 251.3
    },
    {
        timestamp: new Date('2019-07-08T14:55:00Z'),
        direction: 255.1
    },
    {
        timestamp: new Date('2019-07-08T14:56:00Z'),
        direction: 241.9
    },
    {
        timestamp: new Date('2019-07-08T14:57:00Z'),
        direction: 255.7
    },
    {
        timestamp: new Date('2019-07-08T14:58:00Z'),
        direction: 255.9
    },
    {
        timestamp: new Date('2019-07-08T14:59:00Z'),
        direction: 258.4
    },
    {
        timestamp: new Date('2019-07-08T15:00:00Z'),
        direction: 255.9
    },
    {
        timestamp: new Date('2019-07-08T15:01:00Z'),
        direction: 258.8
    },
    {
        timestamp: new Date('2019-07-08T15:02:00Z'),
        direction: 255.6
    },
    {
        timestamp: new Date('2019-07-08T15:03:00Z'),
        direction: 235.6
    },
    {
        timestamp: new Date('2019-07-08T15:04:00Z'),
        direction: 235.6
    },
    {
        timestamp: new Date('2019-07-08T15:05:00Z'),
        direction: 253.3
    },
    {
        timestamp: new Date('2019-07-08T15:06:00Z'),
        direction: 252.4
    },
    {
        timestamp: new Date('2019-07-08T15:07:00Z'),
        direction: 262.4
    },
    {
        timestamp: new Date('2019-07-08T15:08:00Z'),
        direction: 269.6
    },
    {
        timestamp: new Date('2019-07-08T15:09:00Z'),
        direction: 259.8
    },
    {
        timestamp: new Date('2019-07-08T15:10:00Z'),
        direction: 248.3
    },
    {
        timestamp: new Date('2019-07-08T15:11:00Z'),
        direction: 257.3
    },
    {
        timestamp: new Date('2019-07-08T15:12:00Z'),
        direction: 241.5
    },
    {
        timestamp: new Date('2019-07-08T15:13:00Z'),
        direction: 255.1
    },
    {
        timestamp: new Date('2019-07-08T15:14:00Z'),
        direction: 255.2
    },
    {
        timestamp: new Date('2019-07-08T15:15:00Z'),
        direction: 252.1
    },
    {
        timestamp: new Date('2019-07-08T15:16:00Z'),
        direction: 254.8
    },
    {
        timestamp: new Date('2019-07-08T15:17:00Z'),
        direction: 270.4
    },
    {
        timestamp: new Date('2019-07-08T15:18:00Z'),
        direction: 266.3
    },
    {
        timestamp: new Date('2019-07-08T15:19:00Z'),
        direction: 261.3
    },
    {
        timestamp: new Date('2019-07-08T15:20:00Z'),
        direction: 247.4
    },
    {
        timestamp: new Date('2019-07-08T15:21:00Z'),
        direction: 257.6
    },
    {
        timestamp: new Date('2019-07-08T15:22:00Z'),
        direction: 240.6
    },
    {
        timestamp: new Date('2019-07-08T15:23:00Z'),
        direction: 255
    },
    {
        timestamp: new Date('2019-07-08T15:24:00Z'),
        direction: 264
    },
    {
        timestamp: new Date('2019-07-08T15:25:00Z'),
        direction: 256.8
    },
    {
        timestamp: new Date('2019-07-08T15:26:00Z'),
        direction: 259.7
    },
    {
        timestamp: new Date('2019-07-08T15:27:00Z'),
        direction: 253.1
    },
    {
        timestamp: new Date('2019-07-08T15:28:00Z'),
        direction: 271.1
    },
    {
        timestamp: new Date('2019-07-08T15:29:00Z'),
        direction: 259
    },
    {
        timestamp: new Date('2019-07-08T15:30:00Z'),
        direction: 259.6
    },
    {
        timestamp: new Date('2019-07-08T15:31:00Z'),
        direction: 263
    },
    {
        timestamp: new Date('2019-07-08T15:32:00Z'),
        direction: 253.1
    },
    {
        timestamp: new Date('2019-07-08T15:33:00Z'),
        direction: 245.1
    },
    {
        timestamp: new Date('2019-07-08T15:34:00Z'),
        direction: 247.6
    },
    {
        timestamp: new Date('2019-07-08T15:35:00Z'),
        direction: 239.1
    },
    {
        timestamp: new Date('2019-07-08T15:36:00Z'),
        direction: 263.3
    },
    {
        timestamp: new Date('2019-07-08T15:37:00Z'),
        direction: 264.4
    },
    {
        timestamp: new Date('2019-07-08T15:38:00Z'),
        direction: 266.2
    },
    {
        timestamp: new Date('2019-07-08T15:39:00Z'),
        direction: 253.4
    },
    {
        timestamp: new Date('2019-07-08T15:40:00Z'),
        direction: 244.9
    },
    {
        timestamp: new Date('2019-07-08T15:41:00Z'),
        direction: 245.4
    },
    {
        timestamp: new Date('2019-07-08T15:42:00Z'),
        direction: 248.1
    },
    {
        timestamp: new Date('2019-07-08T15:43:00Z'),
        direction: 252.5
    },
    {
        timestamp: new Date('2019-07-08T15:44:00Z'),
        direction: 255.6
    },
    {
        timestamp: new Date('2019-07-08T15:45:00Z'),
        direction: 257.2
    },
    {
        timestamp: new Date('2019-07-08T15:46:00Z'),
        direction: 250.4
    },
    {
        timestamp: new Date('2019-07-08T15:47:00Z'),
        direction: 246.6
    },
    {
        timestamp: new Date('2019-07-08T15:48:00Z'),
        direction: 246.2
    },
    {
        timestamp: new Date('2019-07-08T15:49:00Z'),
        direction: 237.5
    },
    {
        timestamp: new Date('2019-07-08T15:50:00Z'),
        direction: 247.9
    },
    {
        timestamp: new Date('2019-07-08T15:51:00Z'),
        direction: 250.5
    },
    {
        timestamp: new Date('2019-07-08T15:52:00Z'),
        direction: 243.1
    },
    {
        timestamp: new Date('2019-07-08T15:53:00Z'),
        direction: 248
    },
    {
        timestamp: new Date('2019-07-08T15:54:00Z'),
        direction: 250.2
    },
    {
        timestamp: new Date('2019-07-08T15:55:00Z'),
        direction: 248.9
    },
    {
        timestamp: new Date('2019-07-08T15:56:00Z'),
        direction: 255.2
    },
    {
        timestamp: new Date('2019-07-08T15:57:00Z'),
        direction: 255.6
    },
    {
        timestamp: new Date('2019-07-08T15:58:00Z'),
        direction: 256.2
    },
    {
        timestamp: new Date('2019-07-08T15:59:00Z'),
        direction: 252.3
    },
    {
        timestamp: new Date('2019-07-08T16:00:00Z'),
        direction: 247.9
    },
    {
        timestamp: new Date('2019-07-08T16:01:00Z'),
        direction: 246.6
    },
    {
        timestamp: new Date('2019-07-08T16:02:00Z'),
        direction: 260.5
    },
    {
        timestamp: new Date('2019-07-08T16:03:00Z'),
        direction: 248.8
    },
    {
        timestamp: new Date('2019-07-08T16:04:00Z'),
        direction: 268.2
    },
    {
        timestamp: new Date('2019-07-08T16:05:00Z'),
        direction: 255.3
    },
    {
        timestamp: new Date('2019-07-08T16:06:00Z'),
        direction: 254.5
    },
    {
        timestamp: new Date('2019-07-08T16:07:00Z'),
        direction: 254.6
    },
    {
        timestamp: new Date('2019-07-08T16:08:00Z'),
        direction: 250.1
    },
    {
        timestamp: new Date('2019-07-08T16:09:00Z'),
        direction: 245.6
    },
    {
        timestamp: new Date('2019-07-08T16:10:00Z'),
        direction: 242.2
    },
    {
        timestamp: new Date('2019-07-08T16:11:00Z'),
        direction: 243.3
    },
    {
        timestamp: new Date('2019-07-08T16:12:00Z'),
        direction: 243.2
    },
    {
        timestamp: new Date('2019-07-08T16:13:00Z'),
        direction: 252
    },
    {
        timestamp: new Date('2019-07-08T16:14:00Z'),
        direction: 248.8
    },
    {
        timestamp: new Date('2019-07-08T16:15:00Z'),
        direction: 240.4
    },
    {
        timestamp: new Date('2019-07-08T16:16:00Z'),
        direction: 237.1
    },
    {
        timestamp: new Date('2019-07-08T16:17:00Z'),
        direction: 241.8
    },
    {
        timestamp: new Date('2019-07-08T16:18:00Z'),
        direction: 258.7
    },
    {
        timestamp: new Date('2019-07-08T16:19:00Z'),
        direction: 248.1
    },
    {
        timestamp: new Date('2019-07-08T16:20:00Z'),
        direction: 253.3
    },
    {
        timestamp: new Date('2019-07-08T16:21:00Z'),
        direction: 254.6
    },
    {
        timestamp: new Date('2019-07-08T16:22:00Z'),
        direction: 263.6
    },
    {
        timestamp: new Date('2019-07-08T16:23:00Z'),
        direction: 259.1
    },
    {
        timestamp: new Date('2019-07-08T16:24:00Z'),
        direction: 254.7
    },
    {
        timestamp: new Date('2019-07-08T16:25:00Z'),
        direction: 261.3
    },
    {
        timestamp: new Date('2019-07-08T16:26:00Z'),
        direction: 241.1
    },
    {
        timestamp: new Date('2019-07-08T16:27:00Z'),
        direction: 239.2
    },
    {
        timestamp: new Date('2019-07-08T16:28:00Z'),
        direction: 243
    },
    {
        timestamp: new Date('2019-07-08T16:29:00Z'),
        direction: 242.7
    },
    {
        timestamp: new Date('2019-07-08T16:30:00Z'),
        direction: 242.2
    },
    {
        timestamp: new Date('2019-07-08T16:31:00Z'),
        direction: 247
    },
    {
        timestamp: new Date('2019-07-08T16:32:00Z'),
        direction: 254.4
    },
    {
        timestamp: new Date('2019-07-08T16:33:00Z'),
        direction: 271
    },
    {
        timestamp: new Date('2019-07-08T16:34:00Z'),
        direction: 258.4
    },
    {
        timestamp: new Date('2019-07-08T16:35:00Z'),
        direction: 254.1
    },
    {
        timestamp: new Date('2019-07-08T16:36:00Z'),
        direction: 249.6
    },
    {
        timestamp: new Date('2019-07-08T16:37:00Z'),
        direction: 239.3
    },
    {
        timestamp: new Date('2019-07-08T16:38:00Z'),
        direction: 237.6
    },
    {
        timestamp: new Date('2019-07-08T16:39:00Z'),
        direction: 241.2
    },
    {
        timestamp: new Date('2019-07-08T16:40:00Z'),
        direction: 272.8
    },
    {
        timestamp: new Date('2019-07-08T16:41:00Z'),
        direction: 246.1
    },
    {
        timestamp: new Date('2019-07-08T16:42:00Z'),
        direction: 245.8
    },
    {
        timestamp: new Date('2019-07-08T16:43:00Z'),
        direction: 250.7
    },
    {
        timestamp: new Date('2019-07-08T16:44:00Z'),
        direction: 241.2
    },
    {
        timestamp: new Date('2019-07-08T16:45:00Z'),
        direction: 236.6
    },
    {
        timestamp: new Date('2019-07-08T16:46:00Z'),
        direction: 229.6
    },
    {
        timestamp: new Date('2019-07-08T16:47:00Z'),
        direction: 233.8
    },
    {
        timestamp: new Date('2019-07-08T16:48:00Z'),
        direction: 235.2
    },
    {
        timestamp: new Date('2019-07-08T16:49:00Z'),
        direction: 227.8
    },
    {
        timestamp: new Date('2019-07-08T16:50:00Z'),
        direction: 257.1
    },
    {
        timestamp: new Date('2019-07-08T16:51:00Z'),
        direction: 257.3
    },
    {
        timestamp: new Date('2019-07-08T16:52:00Z'),
        direction: 241.1
    },
    {
        timestamp: new Date('2019-07-08T16:53:00Z'),
        direction: 249.4
    },
    {
        timestamp: new Date('2019-07-08T16:54:00Z'),
        direction: 235.7
    },
    {
        timestamp: new Date('2019-07-08T16:55:00Z'),
        direction: 244.9
    },
    {
        timestamp: new Date('2019-07-08T16:56:00Z'),
        direction: 246.1
    },
    {
        timestamp: new Date('2019-07-08T16:57:00Z'),
        direction: 250.7
    },
    {
        timestamp: new Date('2019-07-08T16:58:00Z'),
        direction: 262.6
    },
    {
        timestamp: new Date('2019-07-08T16:59:00Z'),
        direction: 257.8
    },
    {
        timestamp: new Date('2019-07-08T17:00:00Z'),
        direction: 258.5
    },
    {
        timestamp: new Date('2019-07-08T17:01:00Z'),
        direction: 261.8
    },
    {
        timestamp: new Date('2019-07-08T17:02:00Z'),
        direction: 246.6
    },
    {
        timestamp: new Date('2019-07-08T17:03:00Z'),
        direction: 256.3
    },
    {
        timestamp: new Date('2019-07-08T17:04:00Z'),
        direction: 257.9
    },
    {
        timestamp: new Date('2019-07-08T17:05:00Z'),
        direction: 257
    },
    {
        timestamp: new Date('2019-07-08T17:06:00Z'),
        direction: 259.7
    },
    {
        timestamp: new Date('2019-07-08T17:07:00Z'),
        direction: 240.1
    },
    {
        timestamp: new Date('2019-07-08T17:08:00Z'),
        direction: 267.6
    },
    {
        timestamp: new Date('2019-07-08T17:09:00Z'),
        direction: 248.1
    },
    {
        timestamp: new Date('2019-07-08T17:10:00Z'),
        direction: 268.5
    },
    {
        timestamp: new Date('2019-07-08T17:11:00Z'),
        direction: 238.6
    },
    {
        timestamp: new Date('2019-07-08T17:12:00Z'),
        direction: 264.5
    },
    {
        timestamp: new Date('2019-07-08T17:13:00Z'),
        direction: 268.9
    },
    {
        timestamp: new Date('2019-07-08T17:14:00Z'),
        direction: 254.6
    },
    {
        timestamp: new Date('2019-07-08T17:15:00Z'),
        direction: 235.2
    },
    {
        timestamp: new Date('2019-07-08T17:16:00Z'),
        direction: 250.2
    },
    {
        timestamp: new Date('2019-07-08T17:17:00Z'),
        direction: 247.6
    },
    {
        timestamp: new Date('2019-07-08T17:18:00Z'),
        direction: 250.2
    },
    {
        timestamp: new Date('2019-07-08T17:19:00Z'),
        direction: 247.5
    },
    {
        timestamp: new Date('2019-07-08T17:20:00Z'),
        direction: 240.9
    },
    {
        timestamp: new Date('2019-07-08T17:21:00Z'),
        direction: 241.4
    },
    {
        timestamp: new Date('2019-07-08T17:22:00Z'),
        direction: 246.1
    },
    {
        timestamp: new Date('2019-07-08T17:23:00Z'),
        direction: 244.5
    },
    {
        timestamp: new Date('2019-07-08T17:24:00Z'),
        direction: 247.2
    },
    {
        timestamp: new Date('2019-07-08T17:25:00Z'),
        direction: 259.1
    },
    {
        timestamp: new Date('2019-07-08T17:26:00Z'),
        direction: 264.3
    },
    {
        timestamp: new Date('2019-07-08T17:27:00Z'),
        direction: 251.5
    },
    {
        timestamp: new Date('2019-07-08T17:28:00Z'),
        direction: 256.6
    },
    {
        timestamp: new Date('2019-07-08T17:29:00Z'),
        direction: 241.9
    },
    {
        timestamp: new Date('2019-07-08T17:30:00Z'),
        direction: 254.8
    },
    {
        timestamp: new Date('2019-07-08T17:31:00Z'),
        direction: 240
    },
    {
        timestamp: new Date('2019-07-08T17:32:00Z'),
        direction: 240.5
    },
    {
        timestamp: new Date('2019-07-08T17:33:00Z'),
        direction: 251.1
    },
    {
        timestamp: new Date('2019-07-08T17:34:00Z'),
        direction: 248.8
    },
    {
        timestamp: new Date('2019-07-08T17:35:00Z'),
        direction: 250.4
    },
    {
        timestamp: new Date('2019-07-08T17:36:00Z'),
        direction: 251.5
    },
    {
        timestamp: new Date('2019-07-08T17:37:00Z'),
        direction: 253.1
    },
    {
        timestamp: new Date('2019-07-08T17:38:00Z'),
        direction: 257.4
    },
    {
        timestamp: new Date('2019-07-08T17:39:00Z'),
        direction: 256.1
    },
    {
        timestamp: new Date('2019-07-08T17:40:00Z'),
        direction: 240.5
    },
    {
        timestamp: new Date('2019-07-08T17:41:00Z'),
        direction: 244.1
    },
    {
        timestamp: new Date('2019-07-08T17:42:00Z'),
        direction: 248.3
    },
    {
        timestamp: new Date('2019-07-08T17:43:00Z'),
        direction: 242.8
    },
    {
        timestamp: new Date('2019-07-08T17:44:00Z'),
        direction: 255.7
    },
    {
        timestamp: new Date('2019-07-08T17:45:00Z'),
        direction: 249.1
    },
    {
        timestamp: new Date('2019-07-08T17:46:00Z'),
        direction: 254.4
    },
    {
        timestamp: new Date('2019-07-08T17:47:00Z'),
        direction: 253.4
    },
    {
        timestamp: new Date('2019-07-08T17:48:00Z'),
        direction: 253.1
    },
    {
        timestamp: new Date('2019-07-08T17:49:00Z'),
        direction: 256.7
    },
    {
        timestamp: new Date('2019-07-08T17:50:00Z'),
        direction: 271.5
    },
    {
        timestamp: new Date('2019-07-08T17:51:00Z'),
        direction: 283.7
    },
    {
        timestamp: new Date('2019-07-08T17:52:00Z'),
        direction: 280.6
    },
    {
        timestamp: new Date('2019-07-08T17:53:00Z'),
        direction: 291
    },
    {
        timestamp: new Date('2019-07-08T17:54:00Z'),
        direction: 271.1
    },
    {
        timestamp: new Date('2019-07-08T17:55:00Z'),
        direction: 260.2
    },
    {
        timestamp: new Date('2019-07-08T17:56:00Z'),
        direction: 248.3
    },
    {
        timestamp: new Date('2019-07-08T17:57:00Z'),
        direction: 266.6
    },
    {
        timestamp: new Date('2019-07-08T17:58:00Z'),
        direction: 252.4
    },
    {
        timestamp: new Date('2019-07-08T17:59:00Z'),
        direction: 266.2
    },
    {
        timestamp: new Date('2019-07-08T18:00:00Z'),
        direction: 285.8
    },
    {
        timestamp: new Date('2019-07-08T18:01:00Z'),
        direction: 276.4
    },
    {
        timestamp: new Date('2019-07-08T18:02:00Z'),
        direction: 276.6
    },
    {
        timestamp: new Date('2019-07-08T18:03:00Z'),
        direction: 262.9
    },
    {
        timestamp: new Date('2019-07-08T18:04:00Z'),
        direction: 268.3
    },
    {
        timestamp: new Date('2019-07-08T18:05:00Z'),
        direction: 268.6
    },
    {
        timestamp: new Date('2019-07-08T18:06:00Z'),
        direction: 251.5
    },
    {
        timestamp: new Date('2019-07-08T18:07:00Z'),
        direction: 266.1
    },
    {
        timestamp: new Date('2019-07-08T18:08:00Z'),
        direction: 269.8
    },
    {
        timestamp: new Date('2019-07-08T18:09:00Z'),
        direction: 250.9
    },
    {
        timestamp: new Date('2019-07-08T18:10:00Z'),
        direction: 275.4
    },
    {
        timestamp: new Date('2019-07-08T18:11:00Z'),
        direction: 271.3
    },
    {
        timestamp: new Date('2019-07-08T18:12:00Z'),
        direction: 281
    },
    {
        timestamp: new Date('2019-07-08T18:13:00Z'),
        direction: 264.8
    },
    {
        timestamp: new Date('2019-07-08T18:14:00Z'),
        direction: 262.1
    },
    {
        timestamp: new Date('2019-07-08T18:15:00Z'),
        direction: 287.8
    },
    {
        timestamp: new Date('2019-07-08T18:16:00Z'),
        direction: 280.8
    },
    {
        timestamp: new Date('2019-07-08T18:17:00Z'),
        direction: 280
    },
    {
        timestamp: new Date('2019-07-08T18:18:00Z'),
        direction: 268.3
    },
    {
        timestamp: new Date('2019-07-08T18:19:00Z'),
        direction: 259.1
    },
    {
        timestamp: new Date('2019-07-08T18:20:00Z'),
        direction: 289.9
    },
    {
        timestamp: new Date('2019-07-08T18:21:00Z'),
        direction: 283.9
    },
    {
        timestamp: new Date('2019-07-08T18:22:00Z'),
        direction: 281.4
    },
    {
        timestamp: new Date('2019-07-08T18:23:00Z'),
        direction: 272.5
    },
    {
        timestamp: new Date('2019-07-08T18:24:00Z'),
        direction: 286.3
    },
    {
        timestamp: new Date('2019-07-08T18:25:00Z'),
        direction: 281.1
    },
    {
        timestamp: new Date('2019-07-08T18:26:00Z'),
        direction: 271
    },
    {
        timestamp: new Date('2019-07-08T18:27:00Z'),
        direction: 290.8
    },
    {
        timestamp: new Date('2019-07-08T18:28:00Z'),
        direction: 287.6
    },
    {
        timestamp: new Date('2019-07-08T18:29:00Z'),
        direction: 293.9
    },
    {
        timestamp: new Date('2019-07-08T18:30:00Z'),
        direction: 307.2
    },
    {
        timestamp: new Date('2019-07-08T18:31:00Z'),
        direction: 305
    },
    {
        timestamp: new Date('2019-07-08T18:32:00Z'),
        direction: 279.6
    },
    {
        timestamp: new Date('2019-07-08T18:33:00Z'),
        direction: 294.6
    },
    {
        timestamp: new Date('2019-07-08T18:34:00Z'),
        direction: 301.5
    },
    {
        timestamp: new Date('2019-07-08T18:35:00Z'),
        direction: 308.9
    },
    {
        timestamp: new Date('2019-07-08T18:36:00Z'),
        direction: 296.8
    },
    {
        timestamp: new Date('2019-07-08T18:37:00Z'),
        direction: 301
    },
    {
        timestamp: new Date('2019-07-08T18:38:00Z'),
        direction: 299.8
    },
    {
        timestamp: new Date('2019-07-08T18:39:00Z'),
        direction: 291.3
    },
    {
        timestamp: new Date('2019-07-08T18:40:00Z'),
        direction: 290.9
    },
    {
        timestamp: new Date('2019-07-08T18:41:00Z'),
        direction: 291.1
    },
    {
        timestamp: new Date('2019-07-08T18:42:00Z'),
        direction: 303.5
    },
    {
        timestamp: new Date('2019-07-08T18:43:00Z'),
        direction: 321.7
    },
    {
        timestamp: new Date('2019-07-08T18:44:00Z'),
        direction: 301.9
    },
    {
        timestamp: new Date('2019-07-08T18:45:00Z'),
        direction: 297.9
    },
    {
        timestamp: new Date('2019-07-08T18:46:00Z'),
        direction: 310
    },
    {
        timestamp: new Date('2019-07-08T18:47:00Z'),
        direction: 298.2
    },
    {
        timestamp: new Date('2019-07-08T18:48:00Z'),
        direction: 298.4
    },
    {
        timestamp: new Date('2019-07-08T18:49:00Z'),
        direction: 319
    },
    {
        timestamp: new Date('2019-07-08T18:50:00Z'),
        direction: 323.6
    },
    {
        timestamp: new Date('2019-07-08T18:51:00Z'),
        direction: 316.7
    },
    {
        timestamp: new Date('2019-07-08T18:52:00Z'),
        direction: 309.3
    },
    {
        timestamp: new Date('2019-07-08T18:53:00Z'),
        direction: 308.7
    },
    {
        timestamp: new Date('2019-07-08T18:54:00Z'),
        direction: 306.8
    },
    {
        timestamp: new Date('2019-07-08T18:55:00Z'),
        direction: 303.7
    },
    {
        timestamp: new Date('2019-07-08T18:56:00Z'),
        direction: 297.4
    },
    {
        timestamp: new Date('2019-07-08T18:57:00Z'),
        direction: 276.2
    },
    {
        timestamp: new Date('2019-07-08T18:58:00Z'),
        direction: 281.5
    },
    {
        timestamp: new Date('2019-07-08T18:59:00Z'),
        direction: 307.2
    },
    {
        timestamp: new Date('2019-07-08T19:00:00Z'),
        direction: 311.9
    },
    {
        timestamp: new Date('2019-07-08T19:01:00Z'),
        direction: 317.5
    },
    {
        timestamp: new Date('2019-07-08T19:02:00Z'),
        direction: 325.5
    },
    {
        timestamp: new Date('2019-07-08T19:03:00Z'),
        direction: 337.2
    },
    {
        timestamp: new Date('2019-07-08T19:04:00Z'),
        direction: 324.4
    },
    {
        timestamp: new Date('2019-07-08T19:05:00Z'),
        direction: 288.7
    },
    {
        timestamp: new Date('2019-07-08T19:06:00Z'),
        direction: 289
    },
    {
        timestamp: new Date('2019-07-08T19:07:00Z'),
        direction: 323
    },
    {
        timestamp: new Date('2019-07-08T19:08:00Z'),
        direction: 313.7
    },
    {
        timestamp: new Date('2019-07-08T19:09:00Z'),
        direction: 323
    },
    {
        timestamp: new Date('2019-07-08T19:10:00Z'),
        direction: 345
    },
    {
        timestamp: new Date('2019-07-08T19:11:00Z'),
        direction: 321.9
    },
    {
        timestamp: new Date('2019-07-08T19:12:00Z'),
        direction: 320.3
    },
    {
        timestamp: new Date('2019-07-08T19:13:00Z'),
        direction: 280.3
    },
    {
        timestamp: new Date('2019-07-08T19:14:00Z'),
        direction: 293.8
    },
    {
        timestamp: new Date('2019-07-08T19:15:00Z'),
        direction: 306.2
    },
    {
        timestamp: new Date('2019-07-08T19:16:00Z'),
        direction: 295.6
    },
    {
        timestamp: new Date('2019-07-08T19:17:00Z'),
        direction: 281.5
    },
    {
        timestamp: new Date('2019-07-08T19:18:00Z'),
        direction: 295.4
    },
    {
        timestamp: new Date('2019-07-08T19:19:00Z'),
        direction: 318.5
    },
    {
        timestamp: new Date('2019-07-08T19:20:00Z'),
        direction: 319
    },
    {
        timestamp: new Date('2019-07-08T19:21:00Z'),
        direction: 279.7
    },
    {
        timestamp: new Date('2019-07-08T19:22:00Z'),
        direction: 332.1
    },
    {
        timestamp: new Date('2019-07-08T19:23:00Z'),
        direction: 295.6
    },
    {
        timestamp: new Date('2019-07-08T19:24:00Z'),
        direction: 268.1
    },
    {
        timestamp: new Date('2019-07-08T19:25:00Z'),
        direction: 326.4
    },
    {
        timestamp: new Date('2019-07-08T19:26:00Z'),
        direction: 310.3
    },
    {
        timestamp: new Date('2019-07-08T19:27:00Z'),
        direction: 315.9
    },
    {
        timestamp: new Date('2019-07-08T19:28:00Z'),
        direction: 296.2
    },
    {
        timestamp: new Date('2019-07-08T19:29:00Z'),
        direction: 304.6
    },
    {
        timestamp: new Date('2019-07-08T19:30:00Z'),
        direction: 311.1
    },
    {
        timestamp: new Date('2019-07-08T19:31:00Z'),
        direction: 319.1
    },
    {
        timestamp: new Date('2019-07-08T19:32:00Z'),
        direction: 288.5
    },
    {
        timestamp: new Date('2019-07-08T19:33:00Z'),
        direction: 280.4
    },
    {
        timestamp: new Date('2019-07-08T19:34:00Z'),
        direction: 258.5
    },
    {
        timestamp: new Date('2019-07-08T19:35:00Z'),
        direction: 310.5
    },
    {
        timestamp: new Date('2019-07-08T19:36:00Z'),
        direction: 288.9
    },
    {
        timestamp: new Date('2019-07-08T19:37:00Z'),
        direction: 299.1
    },
    {
        timestamp: new Date('2019-07-08T19:38:00Z'),
        direction: 280.1
    },
    {
        timestamp: new Date('2019-07-08T19:39:00Z'),
        direction: 265
    },
    {
        timestamp: new Date('2019-07-08T19:40:00Z'),
        direction: 263.8
    },
    {
        timestamp: new Date('2019-07-08T19:41:00Z'),
        direction: 295.7
    },
    {
        timestamp: new Date('2019-07-08T19:42:00Z'),
        direction: 264.1
    },
    {
        timestamp: new Date('2019-07-08T19:43:00Z'),
        direction: 320.1
    },
    {
        timestamp: new Date('2019-07-08T19:44:00Z'),
        direction: 252.7
    },
    {
        timestamp: new Date('2019-07-08T19:45:00Z'),
        direction: 280.3
    },
    {
        timestamp: new Date('2019-07-08T19:46:00Z'),
        direction: 245.8
    },
    {
        timestamp: new Date('2019-07-08T19:47:00Z'),
        direction: 268
    },
    {
        timestamp: new Date('2019-07-08T19:48:00Z'),
        direction: 257.3
    },
    {
        timestamp: new Date('2019-07-08T19:49:00Z'),
        direction: 256.6
    },
    {
        timestamp: new Date('2019-07-08T19:50:00Z'),
        direction: 271.9
    },
    {
        timestamp: new Date('2019-07-08T19:51:00Z'),
        direction: 233
    },
    {
        timestamp: new Date('2019-07-08T19:52:00Z'),
        direction: 249.3
    },
    {
        timestamp: new Date('2019-07-08T19:53:00Z'),
        direction: 261.7
    },
    {
        timestamp: new Date('2019-07-08T19:54:00Z'),
        direction: 261.3
    },
    {
        timestamp: new Date('2019-07-08T19:55:00Z'),
        direction: 258.9
    },
    {
        timestamp: new Date('2019-07-08T19:56:00Z'),
        direction: 255.6
    },
    {
        timestamp: new Date('2019-07-08T19:57:00Z'),
        direction: 268.4
    },
    {
        timestamp: new Date('2019-07-08T19:58:00Z'),
        direction: 253.1
    },
    {
        timestamp: new Date('2019-07-08T19:59:00Z'),
        direction: 269.1
    },
    {
        timestamp: new Date('2019-07-08T20:00:00Z'),
        direction: 268.8
    },
    {
        timestamp: new Date('2019-07-08T20:01:00Z'),
        direction: 259.2
    },
    {
        timestamp: new Date('2019-07-08T20:02:00Z'),
        direction: 241.1
    },
    {
        timestamp: new Date('2019-07-08T20:03:00Z'),
        direction: 253.5
    },
    {
        timestamp: new Date('2019-07-08T20:04:00Z'),
        direction: 248.2
    },
    {
        timestamp: new Date('2019-07-08T20:05:00Z'),
        direction: 239.2
    },
    {
        timestamp: new Date('2019-07-08T20:06:00Z'),
        direction: 260.7
    },
    {
        timestamp: new Date('2019-07-08T20:07:00Z'),
        direction: 283.5
    },
    {
        timestamp: new Date('2019-07-08T20:08:00Z'),
        direction: 227.2
    },
    {
        timestamp: new Date('2019-07-08T20:09:00Z'),
        direction: 252.2
    },
    {
        timestamp: new Date('2019-07-08T20:10:00Z'),
        direction: 254.7
    },
    {
        timestamp: new Date('2019-07-08T20:11:00Z'),
        direction: 257
    },
    {
        timestamp: new Date('2019-07-08T20:12:00Z'),
        direction: 268.3
    },
    {
        timestamp: new Date('2019-07-08T20:13:00Z'),
        direction: 257.9
    },
    {
        timestamp: new Date('2019-07-08T20:14:00Z'),
        direction: 263.2
    },
    {
        timestamp: new Date('2019-07-08T20:15:00Z'),
        direction: 243.6
    },
    {
        timestamp: new Date('2019-07-08T20:16:00Z'),
        direction: 245
    },
    {
        timestamp: new Date('2019-07-08T20:17:00Z'),
        direction: 255.1
    },
    {
        timestamp: new Date('2019-07-08T20:18:00Z'),
        direction: 279.2
    },
    {
        timestamp: new Date('2019-07-08T20:19:00Z'),
        direction: 273.6
    },
    {
        timestamp: new Date('2019-07-08T20:20:00Z'),
        direction: 244.7
    },
    {
        timestamp: new Date('2019-07-08T20:21:00Z'),
        direction: 259.7
    },
    {
        timestamp: new Date('2019-07-08T20:22:00Z'),
        direction: 196.9
    },
    {
        timestamp: new Date('2019-07-08T20:23:00Z'),
        direction: 244.4
    },
    {
        timestamp: new Date('2019-07-08T20:24:00Z'),
        direction: 249
    },
    {
        timestamp: new Date('2019-07-08T20:25:00Z'),
        direction: 279.2
    },
    {
        timestamp: new Date('2019-07-08T20:26:00Z'),
        direction: 283.3
    },
    {
        timestamp: new Date('2019-07-08T20:27:00Z'),
        direction: 264.6
    },
    {
        timestamp: new Date('2019-07-08T20:28:00Z'),
        direction: 259
    },
    {
        timestamp: new Date('2019-07-08T20:29:00Z'),
        direction: 236.4
    },
    {
        timestamp: new Date('2019-07-08T20:30:00Z'),
        direction: 243.3
    },
    {
        timestamp: new Date('2019-07-08T20:31:00Z'),
        direction: 245.6
    },
    {
        timestamp: new Date('2019-07-08T20:32:00Z'),
        direction: 271.9
    },
    {
        timestamp: new Date('2019-07-08T20:33:00Z'),
        direction: 309.8
    },
    {
        timestamp: new Date('2019-07-08T20:34:00Z'),
        direction: 266.8
    },
    {
        timestamp: new Date('2019-07-08T20:35:00Z'),
        direction: 251.2
    },
    {
        timestamp: new Date('2019-07-08T20:36:00Z'),
        direction: 237.9
    },
    {
        timestamp: new Date('2019-07-08T20:37:00Z'),
        direction: 259.3
    },
    {
        timestamp: new Date('2019-07-08T20:38:00Z'),
        direction: 276.3
    },
    {
        timestamp: new Date('2019-07-08T20:39:00Z'),
        direction: 266.1
    },
    {
        timestamp: new Date('2019-07-08T20:40:00Z'),
        direction: 240.6
    },
    {
        timestamp: new Date('2019-07-08T20:41:00Z'),
        direction: 276.5
    },
    {
        timestamp: new Date('2019-07-08T20:42:00Z'),
        direction: 237.7
    },
    {
        timestamp: new Date('2019-07-08T20:43:00Z'),
        direction: 247.5
    },
    {
        timestamp: new Date('2019-07-08T20:44:00Z'),
        direction: 264.5
    },
    {
        timestamp: new Date('2019-07-08T20:45:00Z'),
        direction: 255.3
    },
    {
        timestamp: new Date('2019-07-08T20:46:00Z'),
        direction: 279.9
    },
    {
        timestamp: new Date('2019-07-08T20:47:00Z'),
        direction: 281.5
    },
    {
        timestamp: new Date('2019-07-08T20:48:00Z'),
        direction: 311.9
    },
    {
        timestamp: new Date('2019-07-08T20:49:00Z'),
        direction: 275
    },
    {
        timestamp: new Date('2019-07-08T20:50:00Z'),
        direction: 253
    },
    {
        timestamp: new Date('2019-07-08T20:51:00Z'),
        direction: 241
    },
    {
        timestamp: new Date('2019-07-08T20:52:00Z'),
        direction: 260.1
    },
    {
        timestamp: new Date('2019-07-08T20:53:00Z'),
        direction: 273.9
    },
    {
        timestamp: new Date('2019-07-08T20:54:00Z'),
        direction: 304.5
    },
    {
        timestamp: new Date('2019-07-08T20:55:00Z'),
        direction: 266.1
    },
    {
        timestamp: new Date('2019-07-08T20:56:00Z'),
        direction: 257.8
    },
    {
        timestamp: new Date('2019-07-08T20:57:00Z'),
        direction: 257.7
    },
    {
        timestamp: new Date('2019-07-08T20:58:00Z'),
        direction: 294.6
    },
    {
        timestamp: new Date('2019-07-08T20:59:00Z'),
        direction: 299.6
    },
    {
        timestamp: new Date('2019-07-08T21:00:00Z'),
        direction: 241.3
    },
    {
        timestamp: new Date('2019-07-08T21:01:00Z'),
        direction: 263.2
    },
    {
        timestamp: new Date('2019-07-08T21:02:00Z'),
        direction: 260.3
    },
    {
        timestamp: new Date('2019-07-08T21:03:00Z'),
        direction: 321.5
    },
    {
        timestamp: new Date('2019-07-08T21:04:00Z'),
        direction: 311.1
    },
    {
        timestamp: new Date('2019-07-08T21:05:00Z'),
        direction: 284.4
    },
    {
        timestamp: new Date('2019-07-08T21:06:00Z'),
        direction: 267.5
    },
    {
        timestamp: new Date('2019-07-08T21:07:00Z'),
        direction: 280.6
    },
    {
        timestamp: new Date('2019-07-08T21:08:00Z'),
        direction: 292.7
    },
    {
        timestamp: new Date('2019-07-08T21:09:00Z'),
        direction: 290.7
    },
    {
        timestamp: new Date('2019-07-08T21:10:00Z'),
        direction: 279.7
    },
    {
        timestamp: new Date('2019-07-08T21:11:00Z'),
        direction: 302
    },
    {
        timestamp: new Date('2019-07-08T21:12:00Z'),
        direction: 257.5
    },
    {
        timestamp: new Date('2019-07-08T21:13:00Z'),
        direction: 279.6
    },
    {
        timestamp: new Date('2019-07-08T21:14:00Z'),
        direction: 272.1
    },
    {
        timestamp: new Date('2019-07-08T21:15:00Z'),
        direction: 279
    },
    {
        timestamp: new Date('2019-07-08T21:16:00Z'),
        direction: 306.1
    },
    {
        timestamp: new Date('2019-07-08T21:17:00Z'),
        direction: 321.7
    },
    {
        timestamp: new Date('2019-07-08T21:18:00Z'),
        direction: 306.1
    },
    {
        timestamp: new Date('2019-07-08T21:19:00Z'),
        direction: 288.5
    },
    {
        timestamp: new Date('2019-07-08T21:20:00Z'),
        direction: 300.8
    },
    {
        timestamp: new Date('2019-07-08T21:21:00Z'),
        direction: 323.4
    },
    {
        timestamp: new Date('2019-07-08T21:22:00Z'),
        direction: 304.6
    },
    {
        timestamp: new Date('2019-07-08T21:23:00Z'),
        direction: 241.2
    },
    {
        timestamp: new Date('2019-07-08T21:24:00Z'),
        direction: 259.3
    },
    {
        timestamp: new Date('2019-07-08T21:25:00Z'),
        direction: 280.6
    },
    {
        timestamp: new Date('2019-07-08T21:26:00Z'),
        direction: 307.5
    },
    {
        timestamp: new Date('2019-07-08T21:27:00Z'),
        direction: 296.7
    },
    {
        timestamp: new Date('2019-07-08T21:28:00Z'),
        direction: 255.1
    },
    {
        timestamp: new Date('2019-07-08T21:29:00Z'),
        direction: 267.7
    },
    {
        timestamp: new Date('2019-07-08T21:30:00Z'),
        direction: 295.5
    },
    {
        timestamp: new Date('2019-07-08T21:31:00Z'),
        direction: 329.2
    },
    {
        timestamp: new Date('2019-07-08T21:32:00Z'),
        direction: 292.1
    },
    {
        timestamp: new Date('2019-07-08T21:33:00Z'),
        direction: 283.3
    },
    {
        timestamp: new Date('2019-07-08T21:34:00Z'),
        direction: 276.5
    },
    {
        timestamp: new Date('2019-07-08T21:35:00Z'),
        direction: 289.6
    },
    {
        timestamp: new Date('2019-07-08T21:36:00Z'),
        direction: 344.1
    },
    {
        timestamp: new Date('2019-07-08T21:37:00Z'),
        direction: 283.7
    },
    {
        timestamp: new Date('2019-07-08T21:38:00Z'),
        direction: 276.8
    },
    {
        timestamp: new Date('2019-07-08T21:39:00Z'),
        direction: 261.6
    },
    {
        timestamp: new Date('2019-07-08T21:40:00Z'),
        direction: 253.4
    },
    {
        timestamp: new Date('2019-07-08T21:41:00Z'),
        direction: 280.5
    },
    {
        timestamp: new Date('2019-07-08T21:42:00Z'),
        direction: 309.4
    },
    {
        timestamp: new Date('2019-07-08T21:43:00Z'),
        direction: 290.7
    },
    {
        timestamp: new Date('2019-07-08T21:44:00Z'),
        direction: 303.6
    },
    {
        timestamp: new Date('2019-07-08T21:45:00Z'),
        direction: 307.5
    },
    {
        timestamp: new Date('2019-07-08T21:46:00Z'),
        direction: 235.1
    },
    {
        timestamp: new Date('2019-07-08T21:47:00Z'),
        direction: 274.8
    },
    {
        timestamp: new Date('2019-07-08T21:48:00Z'),
        direction: 293.4
    },
    {
        timestamp: new Date('2019-07-08T21:49:00Z'),
        direction: 294.9
    },
    {
        timestamp: new Date('2019-07-08T21:50:00Z'),
        direction: 300.7
    },
    {
        timestamp: new Date('2019-07-08T21:51:00Z'),
        direction: 301.5
    },
    {
        timestamp: new Date('2019-07-08T21:52:00Z'),
        direction: 273.9
    },
    {
        timestamp: new Date('2019-07-08T21:53:00Z'),
        direction: 305.1
    },
    {
        timestamp: new Date('2019-07-08T21:54:00Z'),
        direction: 283.2
    },
    {
        timestamp: new Date('2019-07-08T21:55:00Z'),
        direction: 267
    },
    {
        timestamp: new Date('2019-07-08T21:56:00Z'),
        direction: 281.1
    },
    {
        timestamp: new Date('2019-07-08T21:57:00Z'),
        direction: 293.6
    },
    {
        timestamp: new Date('2019-07-08T21:58:00Z'),
        direction: 320.9
    },
    {
        timestamp: new Date('2019-07-08T21:59:00Z'),
        direction: 310.4
    },
    {
        timestamp: new Date('2019-07-08T22:00:00Z'),
        direction: 310.9
    },
    {
        timestamp: new Date('2019-07-08T22:01:00Z'),
        direction: 306
    },
    {
        timestamp: new Date('2019-07-08T22:02:00Z'),
        direction: 322.4
    },
    {
        timestamp: new Date('2019-07-08T22:03:00Z'),
        direction: 282.6
    },
    {
        timestamp: new Date('2019-07-08T22:04:00Z'),
        direction: 251.3
    },
    {
        timestamp: new Date('2019-07-08T22:05:00Z'),
        direction: 282
    },
    {
        timestamp: new Date('2019-07-08T22:06:00Z'),
        direction: 322.6
    },
    {
        timestamp: new Date('2019-07-08T22:07:00Z'),
        direction: 297.6
    },
    {
        timestamp: new Date('2019-07-08T22:08:00Z'),
        direction: 282.6
    },
    {
        timestamp: new Date('2019-07-08T22:09:00Z'),
        direction: 330.7
    },
    {
        timestamp: new Date('2019-07-08T22:10:00Z'),
        direction: 254.6
    },
    {
        timestamp: new Date('2019-07-08T22:11:00Z'),
        direction: 291.7
    },
    {
        timestamp: new Date('2019-07-08T22:12:00Z'),
        direction: 246.9
    },
    {
        timestamp: new Date('2019-07-08T22:13:00Z'),
        direction: 278
    },
    {
        timestamp: new Date('2019-07-08T22:14:00Z'),
        direction: 251.5
    },
    {
        timestamp: new Date('2019-07-08T22:15:00Z'),
        direction: 302.8
    },
    {
        timestamp: new Date('2019-07-08T22:16:00Z'),
        direction: 283.7
    },
    {
        timestamp: new Date('2019-07-08T22:17:00Z'),
        direction: 274.2
    },
    {
        timestamp: new Date('2019-07-08T22:18:00Z'),
        direction: 292.9
    },
    {
        timestamp: new Date('2019-07-08T22:19:00Z'),
        direction: 336
    },
    {
        timestamp: new Date('2019-07-08T22:20:00Z'),
        direction: 244.5
    },
    {
        timestamp: new Date('2019-07-08T22:21:00Z'),
        direction: 335.2
    },
    {
        timestamp: new Date('2019-07-08T22:22:00Z'),
        direction: 320.4
    },
    {
        timestamp: new Date('2019-07-08T22:23:00Z'),
        direction: 306.6
    },
    {
        timestamp: new Date('2019-07-08T22:24:00Z'),
        direction: 312.2
    },
    {
        timestamp: new Date('2019-07-08T22:25:00Z'),
        direction: 331.5
    },
    {
        timestamp: new Date('2019-07-08T22:26:00Z'),
        direction: 337.4
    },
    {
        timestamp: new Date('2019-07-08T22:27:00Z'),
        direction: 324.5
    },
    {
        timestamp: new Date('2019-07-08T22:28:00Z'),
        direction: 297.9
    },
    {
        timestamp: new Date('2019-07-08T22:29:00Z'),
        direction: 311.7
    },
    {
        timestamp: new Date('2019-07-08T22:30:00Z'),
        direction: 318.2
    },
    {
        timestamp: new Date('2019-07-08T22:31:00Z'),
        direction: 336.9
    },
    {
        timestamp: new Date('2019-07-08T22:32:00Z'),
        direction: 349.6
    },
    {
        timestamp: new Date('2019-07-08T22:33:00Z'),
        direction: 293.7
    },
    {
        timestamp: new Date('2019-07-08T22:34:00Z'),
        direction: 294.5
    },
    {
        timestamp: new Date('2019-07-08T22:35:00Z'),
        direction: 332.2
    },
    {
        timestamp: new Date('2019-07-08T22:36:00Z'),
        direction: 351.5
    },
    {
        timestamp: new Date('2019-07-08T22:37:00Z'),
        direction: 340.9
    },
    {
        timestamp: new Date('2019-07-08T22:38:00Z'),
        direction: 328.9
    },
    {
        timestamp: new Date('2019-07-08T22:39:00Z'),
        direction: 323.2
    },
    {
        timestamp: new Date('2019-07-08T22:40:00Z'),
        direction: 329.8
    },
    {
        timestamp: new Date('2019-07-08T22:41:00Z'),
        direction: 322
    },
    {
        timestamp: new Date('2019-07-08T22:42:00Z'),
        direction: 301.8
    },
    {
        timestamp: new Date('2019-07-08T22:43:00Z'),
        direction: 292.7
    },
    {
        timestamp: new Date('2019-07-08T22:44:00Z'),
        direction: 307.6
    },
    {
        timestamp: new Date('2019-07-08T22:45:00Z'),
        direction: 280.1
    },
    {
        timestamp: new Date('2019-07-08T22:46:00Z'),
        direction: 302.4
    },
    {
        timestamp: new Date('2019-07-08T22:47:00Z'),
        direction: 298.4
    },
    {
        timestamp: new Date('2019-07-08T22:48:00Z'),
        direction: 289.8
    },
    {
        timestamp: new Date('2019-07-08T22:49:00Z'),
        direction: 282.9
    },
    {
        timestamp: new Date('2019-07-08T22:50:00Z'),
        direction: 283.3
    },
    {
        timestamp: new Date('2019-07-08T22:51:00Z'),
        direction: 289.5
    },
    {
        timestamp: new Date('2019-07-08T22:52:00Z'),
        direction: 262.7
    },
    {
        timestamp: new Date('2019-07-08T22:53:00Z'),
        direction: 292.3
    },
    {
        timestamp: new Date('2019-07-08T22:54:00Z'),
        direction: 285
    },
    {
        timestamp: new Date('2019-07-08T22:55:00Z'),
        direction: 303.6
    },
    {
        timestamp: new Date('2019-07-08T22:56:00Z'),
        direction: 286.7
    },
    {
        timestamp: new Date('2019-07-08T22:57:00Z'),
        direction: 258.9
    },
    {
        timestamp: new Date('2019-07-08T22:58:00Z'),
        direction: 259.5
    },
    {
        timestamp: new Date('2019-07-08T22:59:00Z'),
        direction: 263.7
    },
    {
        timestamp: new Date('2019-07-08T23:00:00Z'),
        direction: 263.2
    },
    {
        timestamp: new Date('2019-07-08T23:01:00Z'),
        direction: 258.9
    },
    {
        timestamp: new Date('2019-07-08T23:02:00Z'),
        direction: 270.9
    },
    {
        timestamp: new Date('2019-07-08T23:03:00Z'),
        direction: 262.7
    },
    {
        timestamp: new Date('2019-07-08T23:04:00Z'),
        direction: 252.7
    },
    {
        timestamp: new Date('2019-07-08T23:05:00Z'),
        direction: 253.3
    },
    {
        timestamp: new Date('2019-07-08T23:06:00Z'),
        direction: 256.9
    },
    {
        timestamp: new Date('2019-07-08T23:07:00Z'),
        direction: 264.4
    },
    {
        timestamp: new Date('2019-07-08T23:08:00Z'),
        direction: 264.2
    },
    {
        timestamp: new Date('2019-07-08T23:09:00Z'),
        direction: 261.2
    },
    {
        timestamp: new Date('2019-07-08T23:10:00Z'),
        direction: 243.2
    },
    {
        timestamp: new Date('2019-07-08T23:11:00Z'),
        direction: 252
    },
    {
        timestamp: new Date('2019-07-08T23:12:00Z'),
        direction: 259.2
    },
    {
        timestamp: new Date('2019-07-08T23:13:00Z'),
        direction: 276.6
    },
    {
        timestamp: new Date('2019-07-08T23:14:00Z'),
        direction: 278
    },
    {
        timestamp: new Date('2019-07-08T23:15:00Z'),
        direction: 292.1
    },
    {
        timestamp: new Date('2019-07-08T23:16:00Z'),
        direction: 276.3
    },
    {
        timestamp: new Date('2019-07-08T23:17:00Z'),
        direction: 264.6
    },
    {
        timestamp: new Date('2019-07-08T23:18:00Z'),
        direction: 250.8
    },
    {
        timestamp: new Date('2019-07-08T23:19:00Z'),
        direction: 247.4
    },
    {
        timestamp: new Date('2019-07-08T23:20:00Z'),
        direction: 252.4
    },
    {
        timestamp: new Date('2019-07-08T23:21:00Z'),
        direction: 248.8
    },
    {
        timestamp: new Date('2019-07-08T23:22:00Z'),
        direction: 250.9
    },
    {
        timestamp: new Date('2019-07-08T23:23:00Z'),
        direction: 269.1
    },
    {
        timestamp: new Date('2019-07-08T23:24:00Z'),
        direction: 266.9
    },
    {
        timestamp: new Date('2019-07-08T23:25:00Z'),
        direction: 274.2
    },
    {
        timestamp: new Date('2019-07-08T23:26:00Z'),
        direction: 279
    },
    {
        timestamp: new Date('2019-07-08T23:27:00Z'),
        direction: 274.7
    },
    {
        timestamp: new Date('2019-07-08T23:28:00Z'),
        direction: 268.2
    },
    {
        timestamp: new Date('2019-07-08T23:29:00Z'),
        direction: 251.2
    },
    {
        timestamp: new Date('2019-07-08T23:30:00Z'),
        direction: 284.6
    },
    {
        timestamp: new Date('2019-07-08T23:31:00Z'),
        direction: 305.4
    },
    {
        timestamp: new Date('2019-07-08T23:32:00Z'),
        direction: 281
    },
    {
        timestamp: new Date('2019-07-08T23:33:00Z'),
        direction: 263.2
    },
    {
        timestamp: new Date('2019-07-08T23:34:00Z'),
        direction: 281.2
    },
    {
        timestamp: new Date('2019-07-08T23:35:00Z'),
        direction: 289.9
    },
    {
        timestamp: new Date('2019-07-08T23:36:00Z'),
        direction: 268.8
    },
    {
        timestamp: new Date('2019-07-08T23:37:00Z'),
        direction: 282.8
    },
    {
        timestamp: new Date('2019-07-08T23:38:00Z'),
        direction: 289
    },
    {
        timestamp: new Date('2019-07-08T23:39:00Z'),
        direction: 279.1
    },
    {
        timestamp: new Date('2019-07-08T23:40:00Z'),
        direction: 268
    },
    {
        timestamp: new Date('2019-07-08T23:41:00Z'),
        direction: 272.2
    },
    {
        timestamp: new Date('2019-07-08T23:42:00Z'),
        direction: 272.9
    },
    {
        timestamp: new Date('2019-07-08T23:43:00Z'),
        direction: 259.4
    },
    {
        timestamp: new Date('2019-07-08T23:44:00Z'),
        direction: 255.4
    },
    {
        timestamp: new Date('2019-07-08T23:45:00Z'),
        direction: 278.6
    },
    {
        timestamp: new Date('2019-07-08T23:46:00Z'),
        direction: 265.7
    },
    {
        timestamp: new Date('2019-07-08T23:47:00Z'),
        direction: 254.5
    },
    {
        timestamp: new Date('2019-07-08T23:48:00Z'),
        direction: 274
    },
    {
        timestamp: new Date('2019-07-08T23:49:00Z'),
        direction: 267.4
    },
    {
        timestamp: new Date('2019-07-08T23:50:00Z'),
        direction: 272.1
    },
    {
        timestamp: new Date('2019-07-08T23:51:00Z'),
        direction: 254.2
    },
    {
        timestamp: new Date('2019-07-08T23:52:00Z'),
        direction: 258.7
    },
    {
        timestamp: new Date('2019-07-08T23:53:00Z'),
        direction: 237.1
    },
    {
        timestamp: new Date('2019-07-08T23:54:00Z'),
        direction: 261.9
    },
    {
        timestamp: new Date('2019-07-08T23:55:00Z'),
        direction: 251.4
    },
    {
        timestamp: new Date('2019-07-08T23:56:00Z'),
        direction: 262.5
    },
    {
        timestamp: new Date('2019-07-08T23:57:00Z'),
        direction: 239.8
    },
    {
        timestamp: new Date('2019-07-08T23:58:00Z'),
        direction: 254.5
    },
    {
        timestamp: new Date('2019-07-08T23:59:00Z'),
        direction: 253.8
    },
    {
        timestamp: new Date('2019-07-09T00:00:00Z'),
        direction: 244.4
    },
    {
        timestamp: new Date('2019-07-09T00:01:00Z'),
        direction: 241.6
    },
    {
        timestamp: new Date('2019-07-09T00:02:00Z'),
        direction: 239.2
    },
    {
        timestamp: new Date('2019-07-09T00:03:00Z'),
        direction: 247.5
    },
    {
        timestamp: new Date('2019-07-09T00:04:00Z'),
        direction: 255.7
    },
    {
        timestamp: new Date('2019-07-09T00:05:00Z'),
        direction: 251.8
    },
    {
        timestamp: new Date('2019-07-09T00:06:00Z'),
        direction: 256.1
    },
    {
        timestamp: new Date('2019-07-09T00:07:00Z'),
        direction: 253.3
    },
    {
        timestamp: new Date('2019-07-09T00:08:00Z'),
        direction: 255.3
    },
    {
        timestamp: new Date('2019-07-09T00:09:00Z'),
        direction: 248.7
    },
    {
        timestamp: new Date('2019-07-09T00:10:00Z'),
        direction: 249.8
    },
    {
        timestamp: new Date('2019-07-09T00:11:00Z'),
        direction: 249.6
    },
    {
        timestamp: new Date('2019-07-09T00:12:00Z'),
        direction: 239.5
    },
    {
        timestamp: new Date('2019-07-09T00:13:00Z'),
        direction: 251.6
    },
    {
        timestamp: new Date('2019-07-09T00:14:00Z'),
        direction: 244
    },
    {
        timestamp: new Date('2019-07-09T00:15:00Z'),
        direction: 242.1
    },
    {
        timestamp: new Date('2019-07-09T00:16:00Z'),
        direction: 249.2
    },
    {
        timestamp: new Date('2019-07-09T00:17:00Z'),
        direction: 251.9
    },
    {
        timestamp: new Date('2019-07-09T00:18:00Z'),
        direction: 250.6
    },
    {
        timestamp: new Date('2019-07-09T00:19:00Z'),
        direction: 251.7
    },
    {
        timestamp: new Date('2019-07-09T00:20:00Z'),
        direction: 254.9
    },
    {
        timestamp: new Date('2019-07-09T00:21:00Z'),
        direction: 252.2
    },
    {
        timestamp: new Date('2019-07-09T00:22:00Z'),
        direction: 244.9
    },
    {
        timestamp: new Date('2019-07-09T00:23:00Z'),
        direction: 271.9
    },
    {
        timestamp: new Date('2019-07-09T00:24:00Z'),
        direction: 249.1
    },
    {
        timestamp: new Date('2019-07-09T00:25:00Z'),
        direction: 264.7
    },
    {
        timestamp: new Date('2019-07-09T00:26:00Z'),
        direction: 268.9
    },
    {
        timestamp: new Date('2019-07-09T00:27:00Z'),
        direction: 261.1
    },
    {
        timestamp: new Date('2019-07-09T00:28:00Z'),
        direction: 245.3
    },
    {
        timestamp: new Date('2019-07-09T00:29:00Z'),
        direction: 256.3
    },
    {
        timestamp: new Date('2019-07-09T00:30:00Z'),
        direction: 257.1
    },
    {
        timestamp: new Date('2019-07-09T00:31:00Z'),
        direction: 254.1
    },
    {
        timestamp: new Date('2019-07-09T00:32:00Z'),
        direction: 237.7
    },
    {
        timestamp: new Date('2019-07-09T00:33:00Z'),
        direction: 251
    },
    {
        timestamp: new Date('2019-07-09T00:34:00Z'),
        direction: 247.5
    },
    {
        timestamp: new Date('2019-07-09T00:35:00Z'),
        direction: 248.4
    },
    {
        timestamp: new Date('2019-07-09T00:36:00Z'),
        direction: 262
    },
    {
        timestamp: new Date('2019-07-09T00:37:00Z'),
        direction: 272.2
    },
    {
        timestamp: new Date('2019-07-09T00:38:00Z'),
        direction: 253.3
    },
    {
        timestamp: new Date('2019-07-09T00:39:00Z'),
        direction: 252.9
    },
    {
        timestamp: new Date('2019-07-09T00:40:00Z'),
        direction: 259.5
    },
    {
        timestamp: new Date('2019-07-09T00:41:00Z'),
        direction: 258.9
    },
    {
        timestamp: new Date('2019-07-09T00:42:00Z'),
        direction: 248.5
    },
    {
        timestamp: new Date('2019-07-09T00:43:00Z'),
        direction: 256.6
    },
    {
        timestamp: new Date('2019-07-09T00:44:00Z'),
        direction: 258.4
    },
    {
        timestamp: new Date('2019-07-09T00:45:00Z'),
        direction: 268.6
    },
    {
        timestamp: new Date('2019-07-09T00:46:00Z'),
        direction: 265.7
    },
    {
        timestamp: new Date('2019-07-09T00:47:00Z'),
        direction: 261.7
    },
    {
        timestamp: new Date('2019-07-09T00:48:00Z'),
        direction: 257.6
    },
    {
        timestamp: new Date('2019-07-09T00:49:00Z'),
        direction: 258.7
    },
    {
        timestamp: new Date('2019-07-09T00:50:00Z'),
        direction: 251.5
    },
    {
        timestamp: new Date('2019-07-09T00:51:00Z'),
        direction: 255.2
    },
    {
        timestamp: new Date('2019-07-09T00:52:00Z'),
        direction: 251.5
    },
    {
        timestamp: new Date('2019-07-09T00:53:00Z'),
        direction: 258.1
    },
    {
        timestamp: new Date('2019-07-09T00:54:00Z'),
        direction: 266.1
    },
    {
        timestamp: new Date('2019-07-09T00:55:00Z'),
        direction: 258.7
    },
    {
        timestamp: new Date('2019-07-09T00:56:00Z'),
        direction: 285.4
    },
    {
        timestamp: new Date('2019-07-09T00:57:00Z'),
        direction: 267.5
    },
    {
        timestamp: new Date('2019-07-09T00:58:00Z'),
        direction: 263.9
    },
    {
        timestamp: new Date('2019-07-09T00:59:00Z'),
        direction: 256.5
    },
    {
        timestamp: new Date('2019-07-09T01:00:00Z'),
        direction: 270.4
    },
    {
        timestamp: new Date('2019-07-09T01:01:00Z'),
        direction: 262.7
    },
    {
        timestamp: new Date('2019-07-09T01:02:00Z'),
        direction: 247.8
    },
    {
        timestamp: new Date('2019-07-09T01:03:00Z'),
        direction: 251.3
    },
    {
        timestamp: new Date('2019-07-09T01:04:00Z'),
        direction: 269.9
    },
    {
        timestamp: new Date('2019-07-09T01:05:00Z'),
        direction: 261
    },
    {
        timestamp: new Date('2019-07-09T01:06:00Z'),
        direction: 259.5
    },
    {
        timestamp: new Date('2019-07-09T01:07:00Z'),
        direction: 260.6
    },
    {
        timestamp: new Date('2019-07-09T01:08:00Z'),
        direction: 264.9
    },
    {
        timestamp: new Date('2019-07-09T01:09:00Z'),
        direction: 262.7
    },
    {
        timestamp: new Date('2019-07-09T01:10:00Z'),
        direction: 255.5
    },
    {
        timestamp: new Date('2019-07-09T01:11:00Z'),
        direction: 253
    },
    {
        timestamp: new Date('2019-07-09T01:12:00Z'),
        direction: 259.5
    },
    {
        timestamp: new Date('2019-07-09T01:13:00Z'),
        direction: 262.6
    },
    {
        timestamp: new Date('2019-07-09T01:14:00Z'),
        direction: 256.1
    },
    {
        timestamp: new Date('2019-07-09T01:15:00Z'),
        direction: 243.7
    },
    {
        timestamp: new Date('2019-07-09T01:16:00Z'),
        direction: 253.3
    },
    {
        timestamp: new Date('2019-07-09T01:17:00Z'),
        direction: 252.9
    },
    {
        timestamp: new Date('2019-07-09T01:18:00Z'),
        direction: 263
    },
    {
        timestamp: new Date('2019-07-09T01:19:00Z'),
        direction: 261.4
    },
    {
        timestamp: new Date('2019-07-09T01:20:00Z'),
        direction: 248.2
    },
    {
        timestamp: new Date('2019-07-09T01:21:00Z'),
        direction: 254.9
    },
    {
        timestamp: new Date('2019-07-09T01:22:00Z'),
        direction: 249.6
    },
    {
        timestamp: new Date('2019-07-09T01:23:00Z'),
        direction: 260.6
    },
    {
        timestamp: new Date('2019-07-09T01:24:00Z'),
        direction: 264
    },
    {
        timestamp: new Date('2019-07-09T01:25:00Z'),
        direction: 256.3
    },
    {
        timestamp: new Date('2019-07-09T01:26:00Z'),
        direction: 255
    },
    {
        timestamp: new Date('2019-07-09T01:27:00Z'),
        direction: 263.9
    },
    {
        timestamp: new Date('2019-07-09T01:28:00Z'),
        direction: 258.9
    },
    {
        timestamp: new Date('2019-07-09T01:29:00Z'),
        direction: 245.8
    },
    {
        timestamp: new Date('2019-07-09T01:30:00Z'),
        direction: 253.2
    },
    {
        timestamp: new Date('2019-07-09T01:31:00Z'),
        direction: 271
    },
    {
        timestamp: new Date('2019-07-09T01:32:00Z'),
        direction: 263.3
    },
    {
        timestamp: new Date('2019-07-09T01:33:00Z'),
        direction: 252.9
    },
    {
        timestamp: new Date('2019-07-09T01:34:00Z'),
        direction: 253.4
    },
    {
        timestamp: new Date('2019-07-09T01:35:00Z'),
        direction: 252.8
    },
    {
        timestamp: new Date('2019-07-09T01:36:00Z'),
        direction: 268.7
    },
    {
        timestamp: new Date('2019-07-09T01:37:00Z'),
        direction: 258.3
    },
    {
        timestamp: new Date('2019-07-09T01:38:00Z'),
        direction: 253.8
    },
    {
        timestamp: new Date('2019-07-09T01:39:00Z'),
        direction: 253.3
    },
    {
        timestamp: new Date('2019-07-09T01:40:00Z'),
        direction: 248.3
    },
    {
        timestamp: new Date('2019-07-09T01:41:00Z'),
        direction: 261.3
    },
    {
        timestamp: new Date('2019-07-09T01:42:00Z'),
        direction: 255.6
    },
    {
        timestamp: new Date('2019-07-09T01:43:00Z'),
        direction: 256.6
    },
    {
        timestamp: new Date('2019-07-09T01:44:00Z'),
        direction: 253.6
    },
    {
        timestamp: new Date('2019-07-09T01:45:00Z'),
        direction: 246.2
    },
    {
        timestamp: new Date('2019-07-09T01:46:00Z'),
        direction: 259.9
    },
    {
        timestamp: new Date('2019-07-09T01:47:00Z'),
        direction: 250.4
    },
    {
        timestamp: new Date('2019-07-09T01:48:00Z'),
        direction: 245.2
    },
    {
        timestamp: new Date('2019-07-09T01:49:00Z'),
        direction: 253.2
    },
    {
        timestamp: new Date('2019-07-09T01:50:00Z'),
        direction: 264.3
    },
    {
        timestamp: new Date('2019-07-09T01:51:00Z'),
        direction: 257.4
    },
    {
        timestamp: new Date('2019-07-09T01:52:00Z'),
        direction: 252.9
    },
    {
        timestamp: new Date('2019-07-09T01:53:00Z'),
        direction: 247.3
    },
    {
        timestamp: new Date('2019-07-09T01:54:00Z'),
        direction: 249.7
    },
    {
        timestamp: new Date('2019-07-09T01:55:00Z'),
        direction: 248.1
    },
    {
        timestamp: new Date('2019-07-09T01:56:00Z'),
        direction: 247.8
    },
    {
        timestamp: new Date('2019-07-09T01:57:00Z'),
        direction: 256.1
    },
    {
        timestamp: new Date('2019-07-09T01:58:00Z'),
        direction: 259.8
    },
    {
        timestamp: new Date('2019-07-09T01:59:00Z'),
        direction: 253.4
    },
    {
        timestamp: new Date('2019-07-09T02:00:00Z'),
        direction: 250.1
    },
    {
        timestamp: new Date('2019-07-09T02:01:00Z'),
        direction: 258.3
    },
    {
        timestamp: new Date('2019-07-09T02:02:00Z'),
        direction: 238.8
    },
    {
        timestamp: new Date('2019-07-09T02:03:00Z'),
        direction: 243.9
    },
    {
        timestamp: new Date('2019-07-09T02:04:00Z'),
        direction: 258.8
    },
    {
        timestamp: new Date('2019-07-09T02:05:00Z'),
        direction: 253.6
    },
    {
        timestamp: new Date('2019-07-09T02:06:00Z'),
        direction: 247.6
    },
    {
        timestamp: new Date('2019-07-09T02:07:00Z'),
        direction: 238.4
    },
    {
        timestamp: new Date('2019-07-09T02:08:00Z'),
        direction: 241.3
    },
    {
        timestamp: new Date('2019-07-09T02:09:00Z'),
        direction: 237.1
    },
    {
        timestamp: new Date('2019-07-09T02:10:00Z'),
        direction: 244.6
    },
    {
        timestamp: new Date('2019-07-09T02:11:00Z'),
        direction: 240.5
    },
    {
        timestamp: new Date('2019-07-09T02:12:00Z'),
        direction: 241.8
    },
    {
        timestamp: new Date('2019-07-09T02:13:00Z'),
        direction: 244.4
    },
    {
        timestamp: new Date('2019-07-09T02:14:00Z'),
        direction: 236.8
    },
    {
        timestamp: new Date('2019-07-09T02:15:00Z'),
        direction: 245.1
    },
    {
        timestamp: new Date('2019-07-09T02:16:00Z'),
        direction: 240.7
    },
    {
        timestamp: new Date('2019-07-09T02:17:00Z'),
        direction: 241.1
    },
    {
        timestamp: new Date('2019-07-09T02:18:00Z'),
        direction: 249.5
    },
    {
        timestamp: new Date('2019-07-09T02:19:00Z'),
        direction: 249
    },
    {
        timestamp: new Date('2019-07-09T02:20:00Z'),
        direction: 239.9
    },
    {
        timestamp: new Date('2019-07-09T02:21:00Z'),
        direction: 237.8
    },
    {
        timestamp: new Date('2019-07-09T02:22:00Z'),
        direction: 243.1
    },
    {
        timestamp: new Date('2019-07-09T02:23:00Z'),
        direction: 244.1
    },
    {
        timestamp: new Date('2019-07-09T02:24:00Z'),
        direction: 233.1
    },
    {
        timestamp: new Date('2019-07-09T02:25:00Z'),
        direction: 250.8
    },
    {
        timestamp: new Date('2019-07-09T02:26:00Z'),
        direction: 254.5
    },
    {
        timestamp: new Date('2019-07-09T02:27:00Z'),
        direction: 238.3
    },
    {
        timestamp: new Date('2019-07-09T02:28:00Z'),
        direction: 237.2
    },
    {
        timestamp: new Date('2019-07-09T02:29:00Z'),
        direction: 241.1
    },
    {
        timestamp: new Date('2019-07-09T02:30:00Z'),
        direction: 238.4
    },
    {
        timestamp: new Date('2019-07-09T02:31:00Z'),
        direction: 243.7
    },
    {
        timestamp: new Date('2019-07-09T02:32:00Z'),
        direction: 245.4
    },
    {
        timestamp: new Date('2019-07-09T02:33:00Z'),
        direction: 241.3
    },
    {
        timestamp: new Date('2019-07-09T02:34:00Z'),
        direction: 239.2
    },
    {
        timestamp: new Date('2019-07-09T02:35:00Z'),
        direction: 240
    },
    {
        timestamp: new Date('2019-07-09T02:36:00Z'),
        direction: 241.5
    },
    {
        timestamp: new Date('2019-07-09T02:37:00Z'),
        direction: 240.2
    },
    {
        timestamp: new Date('2019-07-09T02:38:00Z'),
        direction: 241.6
    },
    {
        timestamp: new Date('2019-07-09T02:39:00Z'),
        direction: 238
    },
    {
        timestamp: new Date('2019-07-09T02:40:00Z'),
        direction: 244
    },
    {
        timestamp: new Date('2019-07-09T02:41:00Z'),
        direction: 252.2
    },
    {
        timestamp: new Date('2019-07-09T02:42:00Z'),
        direction: 235.7
    },
    {
        timestamp: new Date('2019-07-09T02:43:00Z'),
        direction: 241.3
    },
    {
        timestamp: new Date('2019-07-09T02:44:00Z'),
        direction: 239.8
    },
    {
        timestamp: new Date('2019-07-09T02:45:00Z'),
        direction: 237.4
    },
    {
        timestamp: new Date('2019-07-09T02:46:00Z'),
        direction: 243.2
    },
    {
        timestamp: new Date('2019-07-09T02:47:00Z'),
        direction: 244.7
    },
    {
        timestamp: new Date('2019-07-09T02:48:00Z'),
        direction: 238.5
    },
    {
        timestamp: new Date('2019-07-09T02:49:00Z'),
        direction: 243.3
    },
    {
        timestamp: new Date('2019-07-09T02:50:00Z'),
        direction: 239.8
    },
    {
        timestamp: new Date('2019-07-09T02:51:00Z'),
        direction: 243.5
    },
    {
        timestamp: new Date('2019-07-09T02:52:00Z'),
        direction: 243.5
    },
    {
        timestamp: new Date('2019-07-09T02:53:00Z'),
        direction: 238.5
    },
    {
        timestamp: new Date('2019-07-09T02:54:00Z'),
        direction: 243.2
    },
    {
        timestamp: new Date('2019-07-09T02:55:00Z'),
        direction: 240.4
    },
    {
        timestamp: new Date('2019-07-09T02:56:00Z'),
        direction: 239.9
    },
    {
        timestamp: new Date('2019-07-09T02:57:00Z'),
        direction: 241.8
    },
    {
        timestamp: new Date('2019-07-09T02:58:00Z'),
        direction: 244.1
    },
    {
        timestamp: new Date('2019-07-09T02:59:00Z'),
        direction: 255.5
    },
    {
        timestamp: new Date('2019-07-09T03:00:00Z'),
        direction: 233.6
    },
    {
        timestamp: new Date('2019-07-09T03:01:00Z'),
        direction: 242.5
    },
    {
        timestamp: new Date('2019-07-09T03:02:00Z'),
        direction: 249
    },
    {
        timestamp: new Date('2019-07-09T03:03:00Z'),
        direction: 254.3
    },
    {
        timestamp: new Date('2019-07-09T03:04:00Z'),
        direction: 241.6
    },
    {
        timestamp: new Date('2019-07-09T03:05:00Z'),
        direction: 246.7
    },
    {
        timestamp: new Date('2019-07-09T03:06:00Z'),
        direction: 244
    },
    {
        timestamp: new Date('2019-07-09T03:07:00Z'),
        direction: 252.6
    },
    {
        timestamp: new Date('2019-07-09T03:08:00Z'),
        direction: 254.4
    },
    {
        timestamp: new Date('2019-07-09T03:09:00Z'),
        direction: 246.7
    },
    {
        timestamp: new Date('2019-07-09T03:10:00Z'),
        direction: 251.8
    },
    {
        timestamp: new Date('2019-07-09T03:11:00Z'),
        direction: 254.4
    },
    {
        timestamp: new Date('2019-07-09T03:12:00Z'),
        direction: 249.5
    },
    {
        timestamp: new Date('2019-07-09T03:13:00Z'),
        direction: 245.6
    },
    {
        timestamp: new Date('2019-07-09T03:14:00Z'),
        direction: 251.3
    },
    {
        timestamp: new Date('2019-07-09T03:15:00Z'),
        direction: 240.9
    },
    {
        timestamp: new Date('2019-07-09T03:16:00Z'),
        direction: 249.2
    },
    {
        timestamp: new Date('2019-07-09T03:17:00Z'),
        direction: 256
    },
    {
        timestamp: new Date('2019-07-09T03:18:00Z'),
        direction: 250.7
    },
    {
        timestamp: new Date('2019-07-09T03:19:00Z'),
        direction: 251.8
    },
    {
        timestamp: new Date('2019-07-09T03:20:00Z'),
        direction: 258.4
    },
    {
        timestamp: new Date('2019-07-09T03:21:00Z'),
        direction: 248.9
    },
    {
        timestamp: new Date('2019-07-09T03:22:00Z'),
        direction: 249.2
    },
    {
        timestamp: new Date('2019-07-09T03:23:00Z'),
        direction: 243
    },
    {
        timestamp: new Date('2019-07-09T03:24:00Z'),
        direction: 238.4
    },
    {
        timestamp: new Date('2019-07-09T03:25:00Z'),
        direction: 244.1
    },
    {
        timestamp: new Date('2019-07-09T03:26:00Z'),
        direction: 244.1
    },
    {
        timestamp: new Date('2019-07-09T03:27:00Z'),
        direction: 238.9
    },
    {
        timestamp: new Date('2019-07-09T03:28:00Z'),
        direction: 241.2
    },
    {
        timestamp: new Date('2019-07-09T03:29:00Z'),
        direction: 238.7
    },
    {
        timestamp: new Date('2019-07-09T03:30:00Z'),
        direction: 243.3
    },
    {
        timestamp: new Date('2019-07-09T03:31:00Z'),
        direction: 238.6
    },
    {
        timestamp: new Date('2019-07-09T03:32:00Z'),
        direction: 245.2
    },
    {
        timestamp: new Date('2019-07-09T03:33:00Z'),
        direction: 249.7
    },
    {
        timestamp: new Date('2019-07-09T03:34:00Z'),
        direction: 245.8
    },
    {
        timestamp: new Date('2019-07-09T03:35:00Z'),
        direction: 247.6
    },
    {
        timestamp: new Date('2019-07-09T03:36:00Z'),
        direction: 253.2
    },
    {
        timestamp: new Date('2019-07-09T03:37:00Z'),
        direction: 251.7
    },
    {
        timestamp: new Date('2019-07-09T03:38:00Z'),
        direction: 249.2
    },
    {
        timestamp: new Date('2019-07-09T03:39:00Z'),
        direction: 244.2
    },
    {
        timestamp: new Date('2019-07-09T03:40:00Z'),
        direction: 256
    },
    {
        timestamp: new Date('2019-07-09T03:41:00Z'),
        direction: 243.7
    },
    {
        timestamp: new Date('2019-07-09T03:42:00Z'),
        direction: 247.9
    },
    {
        timestamp: new Date('2019-07-09T03:43:00Z'),
        direction: 254.1
    },
    {
        timestamp: new Date('2019-07-09T03:44:00Z'),
        direction: 245.9
    },
    {
        timestamp: new Date('2019-07-09T03:45:00Z'),
        direction: 243.2
    },
    {
        timestamp: new Date('2019-07-09T03:46:00Z'),
        direction: 237.5
    },
    {
        timestamp: new Date('2019-07-09T03:47:00Z'),
        direction: 244.9
    },
    {
        timestamp: new Date('2019-07-09T03:48:00Z'),
        direction: 241
    },
    {
        timestamp: new Date('2019-07-09T03:49:00Z'),
        direction: 259.4
    },
    {
        timestamp: new Date('2019-07-09T03:50:00Z'),
        direction: 238.9
    },
    {
        timestamp: new Date('2019-07-09T03:51:00Z'),
        direction: 254.5
    },
    {
        timestamp: new Date('2019-07-09T03:52:00Z'),
        direction: 251.8
    },
    {
        timestamp: new Date('2019-07-09T03:53:00Z'),
        direction: 238.2
    },
    {
        timestamp: new Date('2019-07-09T03:54:00Z'),
        direction: 242.9
    },
    {
        timestamp: new Date('2019-07-09T03:55:00Z'),
        direction: 247.2
    },
    {
        timestamp: new Date('2019-07-09T03:56:00Z'),
        direction: 249.5
    },
    {
        timestamp: new Date('2019-07-09T03:57:00Z'),
        direction: 238.6
    },
    {
        timestamp: new Date('2019-07-09T03:58:00Z'),
        direction: 240.7
    },
    {
        timestamp: new Date('2019-07-09T03:59:00Z'),
        direction: 241.3
    },
    {
        timestamp: new Date('2019-07-09T04:00:00Z'),
        direction: 235.5
    },
    {
        timestamp: new Date('2019-07-09T04:01:00Z'),
        direction: 242.9
    },
    {
        timestamp: new Date('2019-07-09T04:02:00Z'),
        direction: 241.5
    },
    {
        timestamp: new Date('2019-07-09T04:03:00Z'),
        direction: 245.3
    },
    {
        timestamp: new Date('2019-07-09T04:04:00Z'),
        direction: 243
    },
    {
        timestamp: new Date('2019-07-09T04:05:00Z'),
        direction: 250.2
    },
    {
        timestamp: new Date('2019-07-09T04:06:00Z'),
        direction: 243.1
    },
    {
        timestamp: new Date('2019-07-09T04:07:00Z'),
        direction: 243.9
    },
    {
        timestamp: new Date('2019-07-09T04:08:00Z'),
        direction: 239.3
    },
    {
        timestamp: new Date('2019-07-09T04:09:00Z'),
        direction: 239.9
    },
    {
        timestamp: new Date('2019-07-09T04:10:00Z'),
        direction: 247
    },
    {
        timestamp: new Date('2019-07-09T04:11:00Z'),
        direction: 243
    },
    {
        timestamp: new Date('2019-07-09T04:12:00Z'),
        direction: 240
    },
    {
        timestamp: new Date('2019-07-09T04:13:00Z'),
        direction: 244.1
    },
    {
        timestamp: new Date('2019-07-09T04:14:00Z'),
        direction: 241.2
    },
    {
        timestamp: new Date('2019-07-09T04:15:00Z'),
        direction: 238.5
    },
    {
        timestamp: new Date('2019-07-09T04:16:00Z'),
        direction: 241.5
    },
    {
        timestamp: new Date('2019-07-09T04:17:00Z'),
        direction: 241.2
    },
    {
        timestamp: new Date('2019-07-09T04:18:00Z'),
        direction: 239.8
    },
    {
        timestamp: new Date('2019-07-09T04:19:00Z'),
        direction: 238.5
    },
    {
        timestamp: new Date('2019-07-09T04:20:00Z'),
        direction: 237.3
    },
    {
        timestamp: new Date('2019-07-09T04:21:00Z'),
        direction: 240.4
    },
    {
        timestamp: new Date('2019-07-09T04:22:00Z'),
        direction: 239.1
    },
    {
        timestamp: new Date('2019-07-09T04:23:00Z'),
        direction: 238
    },
    {
        timestamp: new Date('2019-07-09T04:24:00Z'),
        direction: 237.1
    },
    {
        timestamp: new Date('2019-07-09T04:25:00Z'),
        direction: 240.2
    },
    {
        timestamp: new Date('2019-07-09T04:26:00Z'),
        direction: 238.1
    },
    {
        timestamp: new Date('2019-07-09T04:27:00Z'),
        direction: 241.9
    },
    {
        timestamp: new Date('2019-07-09T04:28:00Z'),
        direction: 240.3
    },
    {
        timestamp: new Date('2019-07-09T04:29:00Z'),
        direction: 246.6
    },
    {
        timestamp: new Date('2019-07-09T04:30:00Z'),
        direction: 242
    },
    {
        timestamp: new Date('2019-07-09T04:31:00Z'),
        direction: 238.3
    },
    {
        timestamp: new Date('2019-07-09T04:32:00Z'),
        direction: 236.6
    },
    {
        timestamp: new Date('2019-07-09T04:33:00Z'),
        direction: 252.5
    },
    {
        timestamp: new Date('2019-07-09T04:34:00Z'),
        direction: 241.5
    },
    {
        timestamp: new Date('2019-07-09T04:35:00Z'),
        direction: 239.2
    },
    {
        timestamp: new Date('2019-07-09T04:36:00Z'),
        direction: 247.9
    },
    {
        timestamp: new Date('2019-07-09T04:37:00Z'),
        direction: 241.4
    },
    {
        timestamp: new Date('2019-07-09T04:38:00Z'),
        direction: 240.5
    },
    {
        timestamp: new Date('2019-07-09T04:39:00Z'),
        direction: 244.2
    },
    {
        timestamp: new Date('2019-07-09T04:40:00Z'),
        direction: 243.9
    },
    {
        timestamp: new Date('2019-07-09T04:41:00Z'),
        direction: 248.4
    },
    {
        timestamp: new Date('2019-07-09T04:42:00Z'),
        direction: 253.7
    },
    {
        timestamp: new Date('2019-07-09T04:43:00Z'),
        direction: 241.7
    },
    {
        timestamp: new Date('2019-07-09T04:44:00Z'),
        direction: 244.4
    },
    {
        timestamp: new Date('2019-07-09T04:45:00Z'),
        direction: 251.4
    },
    {
        timestamp: new Date('2019-07-09T04:46:00Z'),
        direction: 247.9
    },
    {
        timestamp: new Date('2019-07-09T04:47:00Z'),
        direction: 252.5
    },
    {
        timestamp: new Date('2019-07-09T04:48:00Z'),
        direction: 248.3
    },
    {
        timestamp: new Date('2019-07-09T04:49:00Z'),
        direction: 260.3
    },
    {
        timestamp: new Date('2019-07-09T04:50:00Z'),
        direction: 255.2
    },
    {
        timestamp: new Date('2019-07-09T04:51:00Z'),
        direction: 258.9
    },
    {
        timestamp: new Date('2019-07-09T04:52:00Z'),
        direction: 243.5
    },
    {
        timestamp: new Date('2019-07-09T04:53:00Z'),
        direction: 252.9
    },
    {
        timestamp: new Date('2019-07-09T04:54:00Z'),
        direction: 279.1
    },
    {
        timestamp: new Date('2019-07-09T04:55:00Z'),
        direction: 276.3
    },
    {
        timestamp: new Date('2019-07-09T04:56:00Z'),
        direction: 286
    },
    {
        timestamp: new Date('2019-07-09T04:57:00Z'),
        direction: 267.4
    },
    {
        timestamp: new Date('2019-07-09T04:58:00Z'),
        direction: 265.4
    },
    {
        timestamp: new Date('2019-07-09T04:59:00Z'),
        direction: 264.3
    },
    {
        timestamp: new Date('2019-07-09T05:00:00Z'),
        direction: 281.2
    },
    {
        timestamp: new Date('2019-07-09T05:01:00Z'),
        direction: 275.1
    },
    {
        timestamp: new Date('2019-07-09T05:02:00Z'),
        direction: 259.8
    },
    {
        timestamp: new Date('2019-07-09T05:03:00Z'),
        direction: 267.8
    },
    {
        timestamp: new Date('2019-07-09T05:04:00Z'),
        direction: 274.4
    },
    {
        timestamp: new Date('2019-07-09T05:05:00Z'),
        direction: 273.9
    },
    {
        timestamp: new Date('2019-07-09T05:06:00Z'),
        direction: 269.3
    },
    {
        timestamp: new Date('2019-07-09T05:07:00Z'),
        direction: 267.2
    },
    {
        timestamp: new Date('2019-07-09T05:08:00Z'),
        direction: 256.1
    },
    {
        timestamp: new Date('2019-07-09T05:09:00Z'),
        direction: 261.5
    },
    {
        timestamp: new Date('2019-07-09T05:10:00Z'),
        direction: 254.8
    },
    {
        timestamp: new Date('2019-07-09T05:11:00Z'),
        direction: 265
    },
    {
        timestamp: new Date('2019-07-09T05:12:00Z'),
        direction: 255.4
    },
    {
        timestamp: new Date('2019-07-09T05:13:00Z'),
        direction: 244.6
    },
    {
        timestamp: new Date('2019-07-09T05:14:00Z'),
        direction: 255.3
    },
    {
        timestamp: new Date('2019-07-09T05:15:00Z'),
        direction: 273
    },
    {
        timestamp: new Date('2019-07-09T05:16:00Z'),
        direction: 264.2
    },
    {
        timestamp: new Date('2019-07-09T05:17:00Z'),
        direction: 278.5
    },
    {
        timestamp: new Date('2019-07-09T05:18:00Z'),
        direction: 261
    },
    {
        timestamp: new Date('2019-07-09T05:19:00Z'),
        direction: 273.6
    },
    {
        timestamp: new Date('2019-07-09T05:20:00Z'),
        direction: 271.2
    },
    {
        timestamp: new Date('2019-07-09T05:21:00Z'),
        direction: 282.3
    },
    {
        timestamp: new Date('2019-07-09T05:22:00Z'),
        direction: 293.1
    },
    {
        timestamp: new Date('2019-07-09T05:23:00Z'),
        direction: 281.8
    },
    {
        timestamp: new Date('2019-07-09T05:24:00Z'),
        direction: 290.7
    },
    {
        timestamp: new Date('2019-07-09T05:25:00Z'),
        direction: 288.2
    },
    {
        timestamp: new Date('2019-07-09T05:26:00Z'),
        direction: 292
    },
    {
        timestamp: new Date('2019-07-09T05:27:00Z'),
        direction: 291.8
    },
    {
        timestamp: new Date('2019-07-09T05:28:00Z'),
        direction: 287.6
    },
    {
        timestamp: new Date('2019-07-09T05:29:00Z'),
        direction: 296
    },
    {
        timestamp: new Date('2019-07-09T05:30:00Z'),
        direction: 293.5
    },
    {
        timestamp: new Date('2019-07-09T05:31:00Z'),
        direction: 283.1
    },
    {
        timestamp: new Date('2019-07-09T05:32:00Z'),
        direction: 295.6
    },
    {
        timestamp: new Date('2019-07-09T05:33:00Z'),
        direction: 308.4
    },
    {
        timestamp: new Date('2019-07-09T05:34:00Z'),
        direction: 268.9
    },
    {
        timestamp: new Date('2019-07-09T05:35:00Z'),
        direction: 280.6
    },
    {
        timestamp: new Date('2019-07-09T05:36:00Z'),
        direction: 273
    },
    {
        timestamp: new Date('2019-07-09T05:37:00Z'),
        direction: 259.2
    },
    {
        timestamp: new Date('2019-07-09T05:38:00Z'),
        direction: 255.8
    },
    {
        timestamp: new Date('2019-07-09T05:39:00Z'),
        direction: 254.1
    },
    {
        timestamp: new Date('2019-07-09T05:40:00Z'),
        direction: 252.2
    },
    {
        timestamp: new Date('2019-07-09T05:41:00Z'),
        direction: 257.3
    },
    {
        timestamp: new Date('2019-07-09T05:42:00Z'),
        direction: 252.4
    },
    {
        timestamp: new Date('2019-07-09T05:43:00Z'),
        direction: 264.2
    },
    {
        timestamp: new Date('2019-07-09T05:44:00Z'),
        direction: 260.5
    },
    {
        timestamp: new Date('2019-07-09T05:45:00Z'),
        direction: 263.9
    },
    {
        timestamp: new Date('2019-07-09T05:46:00Z'),
        direction: 261.3
    },
    {
        timestamp: new Date('2019-07-09T05:47:00Z'),
        direction: 254.3
    },
    {
        timestamp: new Date('2019-07-09T05:48:00Z'),
        direction: 245.9
    },
    {
        timestamp: new Date('2019-07-09T05:49:00Z'),
        direction: 237.8
    },
    {
        timestamp: new Date('2019-07-09T05:50:00Z'),
        direction: 257.4
    },
    {
        timestamp: new Date('2019-07-09T05:51:00Z'),
        direction: 247.9
    },
    {
        timestamp: new Date('2019-07-09T05:52:00Z'),
        direction: 254.8
    },
    {
        timestamp: new Date('2019-07-09T05:53:00Z'),
        direction: 248.6
    },
    {
        timestamp: new Date('2019-07-09T05:54:00Z'),
        direction: 257.6
    },
    {
        timestamp: new Date('2019-07-09T05:55:00Z'),
        direction: 250.8
    },
    {
        timestamp: new Date('2019-07-09T05:56:00Z'),
        direction: 244.8
    },
    {
        timestamp: new Date('2019-07-09T05:57:00Z'),
        direction: 249.4
    },
    {
        timestamp: new Date('2019-07-09T05:58:00Z'),
        direction: 237.3
    },
    {
        timestamp: new Date('2019-07-09T05:59:00Z'),
        direction: 249
    },
    {
        timestamp: new Date('2019-07-09T06:00:00Z'),
        direction: 251.3
    },
    {
        timestamp: new Date('2019-07-09T06:01:00Z'),
        direction: 253.2
    },
    {
        timestamp: new Date('2019-07-09T06:02:00Z'),
        direction: 255.4
    },
    {
        timestamp: new Date('2019-07-09T06:03:00Z'),
        direction: 251
    },
    {
        timestamp: new Date('2019-07-09T06:04:00Z'),
        direction: 244.3
    },
    {
        timestamp: new Date('2019-07-09T06:05:00Z'),
        direction: 254
    },
    {
        timestamp: new Date('2019-07-09T06:06:00Z'),
        direction: 259.4
    },
    {
        timestamp: new Date('2019-07-09T06:07:00Z'),
        direction: 269.9
    },
    {
        timestamp: new Date('2019-07-09T06:08:00Z'),
        direction: 272.1
    },
    {
        timestamp: new Date('2019-07-09T06:09:00Z'),
        direction: 246.5
    },
    {
        timestamp: new Date('2019-07-09T06:10:00Z'),
        direction: 249.4
    },
    {
        timestamp: new Date('2019-07-09T06:11:00Z'),
        direction: 249.6
    },
    {
        timestamp: new Date('2019-07-09T06:12:00Z'),
        direction: 282.2
    },
    {
        timestamp: new Date('2019-07-09T06:13:00Z'),
        direction: 265.3
    },
    {
        timestamp: new Date('2019-07-09T06:14:00Z'),
        direction: 272.5
    },
    {
        timestamp: new Date('2019-07-09T06:15:00Z'),
        direction: 268.3
    },
    {
        timestamp: new Date('2019-07-09T06:16:00Z'),
        direction: 270.3
    },
    {
        timestamp: new Date('2019-07-09T06:17:00Z'),
        direction: 294.5
    },
    {
        timestamp: new Date('2019-07-09T06:18:00Z'),
        direction: 269.3
    },
    {
        timestamp: new Date('2019-07-09T06:19:00Z'),
        direction: 244.4
    },
    {
        timestamp: new Date('2019-07-09T06:20:00Z'),
        direction: 248.7
    },
    {
        timestamp: new Date('2019-07-09T06:21:00Z'),
        direction: 259.2
    },
    {
        timestamp: new Date('2019-07-09T06:22:00Z'),
        direction: 265.1
    },
    {
        timestamp: new Date('2019-07-09T06:23:00Z'),
        direction: 273
    },
    {
        timestamp: new Date('2019-07-09T06:24:00Z'),
        direction: 261.5
    },
    {
        timestamp: new Date('2019-07-09T06:25:00Z'),
        direction: 353.7
    },
    {
        timestamp: new Date('2019-07-09T06:26:00Z'),
        direction: 344.5
    },
    {
        timestamp: new Date('2019-07-09T06:27:00Z'),
        direction: 285.4
    },
    {
        timestamp: new Date('2019-07-09T06:28:00Z'),
        direction: 312.3
    },
    {
        timestamp: new Date('2019-07-09T06:29:00Z'),
        direction: 251.4
    },
    {
        timestamp: new Date('2019-07-09T06:30:00Z'),
        direction: 329.2
    },
    {
        timestamp: new Date('2019-07-09T06:31:00Z'),
        direction: 308.6
    },
    {
        timestamp: new Date('2019-07-09T06:32:00Z'),
        direction: 248.7
    },
    {
        timestamp: new Date('2019-07-09T06:33:00Z'),
        direction: 308.5
    },
    {
        timestamp: new Date('2019-07-09T06:34:00Z'),
        direction: 254
    },
    {
        timestamp: new Date('2019-07-09T06:35:00Z'),
        direction: 243.3
    },
    {
        timestamp: new Date('2019-07-09T06:36:00Z'),
        direction: 234.9
    },
    {
        timestamp: new Date('2019-07-09T06:37:00Z'),
        direction: 222.2
    },
    {
        timestamp: new Date('2019-07-09T06:38:00Z'),
        direction: 51.33
    },
    {
        timestamp: new Date('2019-07-09T06:39:00Z'),
        direction: 32.36
    },
    {
        timestamp: new Date('2019-07-09T06:40:00Z'),
        direction: 284.3
    },
    {
        timestamp: new Date('2019-07-09T06:41:00Z'),
        direction: 292.7
    },
    {
        timestamp: new Date('2019-07-09T06:42:00Z'),
        direction: 284.3
    },
    {
        timestamp: new Date('2019-07-09T06:43:00Z'),
        direction: 306.3
    },
    {
        timestamp: new Date('2019-07-09T06:44:00Z'),
        direction: 312.1
    },
    {
        timestamp: new Date('2019-07-09T06:45:00Z'),
        direction: 306.5
    },
    {
        timestamp: new Date('2019-07-09T06:46:00Z'),
        direction: 173.3
    },
    {
        timestamp: new Date('2019-07-09T06:47:00Z'),
        direction: 5.982
    },
    {
        timestamp: new Date('2019-07-09T06:48:00Z'),
        direction: 252.7
    },
    {
        timestamp: new Date('2019-07-09T06:49:00Z'),
        direction: 128.1
    },
    {
        timestamp: new Date('2019-07-09T06:50:00Z'),
        direction: 90.4
    },
    {
        timestamp: new Date('2019-07-09T06:51:00Z'),
        direction: 335.3
    },
    {
        timestamp: new Date('2019-07-09T06:52:00Z'),
        direction: 301.3
    },
    {
        timestamp: new Date('2019-07-09T06:53:00Z'),
        direction: 277.7
    },
    {
        timestamp: new Date('2019-07-09T06:54:00Z'),
        direction: 236.9
    },
    {
        timestamp: new Date('2019-07-09T06:55:00Z'),
        direction: 219.6
    },
    {
        timestamp: new Date('2019-07-09T06:56:00Z'),
        direction: 237.6
    },
    {
        timestamp: new Date('2019-07-09T06:57:00Z'),
        direction: 8.5
    },
    {
        timestamp: new Date('2019-07-09T06:58:00Z'),
        direction: 337.7
    },
    {
        timestamp: new Date('2019-07-09T06:59:00Z'),
        direction: 303.1
    },
    {
        timestamp: new Date('2019-07-09T07:00:00Z'),
        direction: 308.3
    },
    {
        timestamp: new Date('2019-07-09T07:01:00Z'),
        direction: 268
    },
    {
        timestamp: new Date('2019-07-09T07:02:00Z'),
        direction: 272.7
    },
    {
        timestamp: new Date('2019-07-09T07:03:00Z'),
        direction: 265.6
    },
    {
        timestamp: new Date('2019-07-09T07:04:00Z'),
        direction: 267
    },
    {
        timestamp: new Date('2019-07-09T07:05:00Z'),
        direction: 283
    },
    {
        timestamp: new Date('2019-07-09T07:06:00Z'),
        direction: 259.7
    },
    {
        timestamp: new Date('2019-07-09T07:07:00Z'),
        direction: 249.2
    },
    {
        timestamp: new Date('2019-07-09T07:08:00Z'),
        direction: 253.9
    },
    {
        timestamp: new Date('2019-07-09T07:09:00Z'),
        direction: 269.6
    },
    {
        timestamp: new Date('2019-07-09T07:10:00Z'),
        direction: 246.4
    },
    {
        timestamp: new Date('2019-07-09T07:11:00Z'),
        direction: 256.4
    },
    {
        timestamp: new Date('2019-07-09T07:12:00Z'),
        direction: 244.9
    },
    {
        timestamp: new Date('2019-07-09T07:13:00Z'),
        direction: 239.6
    },
    {
        timestamp: new Date('2019-07-09T07:14:00Z'),
        direction: 237.9
    },
    {
        timestamp: new Date('2019-07-09T07:15:00Z'),
        direction: 244.1
    },
    {
        timestamp: new Date('2019-07-09T07:16:00Z'),
        direction: 244
    },
    {
        timestamp: new Date('2019-07-09T07:17:00Z'),
        direction: 243.1
    },
    {
        timestamp: new Date('2019-07-09T07:18:00Z'),
        direction: 256.3
    },
    {
        timestamp: new Date('2019-07-09T07:19:00Z'),
        direction: 251.9
    },
    {
        timestamp: new Date('2019-07-09T07:20:00Z'),
        direction: 254.8
    },
    {
        timestamp: new Date('2019-07-09T07:21:00Z'),
        direction: 245.1
    },
    {
        timestamp: new Date('2019-07-09T07:22:00Z'),
        direction: 241
    },
    {
        timestamp: new Date('2019-07-09T07:23:00Z'),
        direction: 260.7
    },
    {
        timestamp: new Date('2019-07-09T07:24:00Z'),
        direction: 260.4
    },
    {
        timestamp: new Date('2019-07-09T07:25:00Z'),
        direction: 259
    },
    {
        timestamp: new Date('2019-07-09T07:26:00Z'),
        direction: 255.6
    },
    {
        timestamp: new Date('2019-07-09T07:27:00Z'),
        direction: 251.2
    },
    {
        timestamp: new Date('2019-07-09T07:28:00Z'),
        direction: 256.1
    },
    {
        timestamp: new Date('2019-07-09T07:29:00Z'),
        direction: 250.9
    },
    {
        timestamp: new Date('2019-07-09T07:30:00Z'),
        direction: 258.8
    },
    {
        timestamp: new Date('2019-07-09T07:31:00Z'),
        direction: 257.8
    },
    {
        timestamp: new Date('2019-07-09T07:32:00Z'),
        direction: 256.2
    },
    {
        timestamp: new Date('2019-07-09T07:33:00Z'),
        direction: 248.2
    },
    {
        timestamp: new Date('2019-07-09T07:34:00Z'),
        direction: 244
    },
    {
        timestamp: new Date('2019-07-09T07:35:00Z'),
        direction: 247.6
    },
    {
        timestamp: new Date('2019-07-09T07:36:00Z'),
        direction: 249.8
    },
    {
        timestamp: new Date('2019-07-09T07:37:00Z'),
        direction: 242.8
    },
    {
        timestamp: new Date('2019-07-09T07:38:00Z'),
        direction: 245.9
    },
    {
        timestamp: new Date('2019-07-09T07:39:00Z'),
        direction: 247.6
    },
    {
        timestamp: new Date('2019-07-09T07:40:00Z'),
        direction: 251.6
    },
    {
        timestamp: new Date('2019-07-09T07:41:00Z'),
        direction: 249
    },
    {
        timestamp: new Date('2019-07-09T07:42:00Z'),
        direction: 260.8
    },
    {
        timestamp: new Date('2019-07-09T07:43:00Z'),
        direction: 248.2
    },
    {
        timestamp: new Date('2019-07-09T07:44:00Z'),
        direction: 243.9
    },
    {
        timestamp: new Date('2019-07-09T07:45:00Z'),
        direction: 257.5
    },
    {
        timestamp: new Date('2019-07-09T07:46:00Z'),
        direction: 244.4
    },
    {
        timestamp: new Date('2019-07-09T07:47:00Z'),
        direction: 253.1
    },
    {
        timestamp: new Date('2019-07-09T07:48:00Z'),
        direction: 253.1
    },
    {
        timestamp: new Date('2019-07-09T07:49:00Z'),
        direction: 233.7
    },
    {
        timestamp: new Date('2019-07-09T07:50:00Z'),
        direction: 244.2
    },
    {
        timestamp: new Date('2019-07-09T07:51:00Z'),
        direction: 250
    },
    {
        timestamp: new Date('2019-07-09T07:52:00Z'),
        direction: 268.8
    },
    {
        timestamp: new Date('2019-07-09T07:53:00Z'),
        direction: 254.6
    },
    {
        timestamp: new Date('2019-07-09T07:54:00Z'),
        direction: 247.6
    },
    {
        timestamp: new Date('2019-07-09T07:55:00Z'),
        direction: 252
    },
    {
        timestamp: new Date('2019-07-09T07:56:00Z'),
        direction: 235.2
    },
    {
        timestamp: new Date('2019-07-09T07:57:00Z'),
        direction: 257.5
    },
    {
        timestamp: new Date('2019-07-09T07:58:00Z'),
        direction: 263.1
    },
    {
        timestamp: new Date('2019-07-09T07:59:00Z'),
        direction: 268.6
    },
    {
        timestamp: new Date('2019-07-09T08:00:00Z'),
        direction: 242.3
    },
    {
        timestamp: new Date('2019-07-09T08:01:00Z'),
        direction: 246.9
    },
    {
        timestamp: new Date('2019-07-09T08:02:00Z'),
        direction: 239.2
    },
    {
        timestamp: new Date('2019-07-09T08:03:00Z'),
        direction: 235.6
    },
    {
        timestamp: new Date('2019-07-09T08:04:00Z'),
        direction: 244.1
    },
    {
        timestamp: new Date('2019-07-09T08:05:00Z'),
        direction: 256.9
    },
    {
        timestamp: new Date('2019-07-09T08:06:00Z'),
        direction: 243.3
    },
    {
        timestamp: new Date('2019-07-09T08:07:00Z'),
        direction: 247.3
    },
    {
        timestamp: new Date('2019-07-09T08:08:00Z'),
        direction: 238.4
    },
    {
        timestamp: new Date('2019-07-09T08:09:00Z'),
        direction: 243.3
    },
    {
        timestamp: new Date('2019-07-09T08:10:00Z'),
        direction: 246.6
    },
    {
        timestamp: new Date('2019-07-09T08:11:00Z'),
        direction: 238.7
    },
    {
        timestamp: new Date('2019-07-09T08:12:00Z'),
        direction: 238.7
    },
    {
        timestamp: new Date('2019-07-09T08:13:00Z'),
        direction: 243.3
    },
    {
        timestamp: new Date('2019-07-09T08:14:00Z'),
        direction: 244.4
    },
    {
        timestamp: new Date('2019-07-09T08:15:00Z'),
        direction: 258.4
    },
    {
        timestamp: new Date('2019-07-09T08:16:00Z'),
        direction: 245.7
    },
    {
        timestamp: new Date('2019-07-09T08:17:00Z'),
        direction: 245.3
    },
    {
        timestamp: new Date('2019-07-09T08:18:00Z'),
        direction: 250.3
    },
    {
        timestamp: new Date('2019-07-09T08:19:00Z'),
        direction: 244.6
    },
    {
        timestamp: new Date('2019-07-09T08:20:00Z'),
        direction: 243.5
    },
    {
        timestamp: new Date('2019-07-09T08:21:00Z'),
        direction: 242.9
    },
    {
        timestamp: new Date('2019-07-09T08:22:00Z'),
        direction: 248.8
    },
    {
        timestamp: new Date('2019-07-09T08:23:00Z'),
        direction: 251.4
    },
    {
        timestamp: new Date('2019-07-09T08:24:00Z'),
        direction: 246.5
    },
    {
        timestamp: new Date('2019-07-09T08:25:00Z'),
        direction: 245.7
    },
    {
        timestamp: new Date('2019-07-09T08:26:00Z'),
        direction: 239.2
    },
    {
        timestamp: new Date('2019-07-09T08:27:00Z'),
        direction: 246.8
    },
    {
        timestamp: new Date('2019-07-09T08:28:00Z'),
        direction: 246.7
    },
    {
        timestamp: new Date('2019-07-09T08:29:00Z'),
        direction: 255.9
    },
    {
        timestamp: new Date('2019-07-09T08:30:00Z'),
        direction: 241
    },
    {
        timestamp: new Date('2019-07-09T08:31:00Z'),
        direction: 244
    },
    {
        timestamp: new Date('2019-07-09T08:32:00Z'),
        direction: 242.8
    },
    {
        timestamp: new Date('2019-07-09T08:33:00Z'),
        direction: 249.3
    },
    {
        timestamp: new Date('2019-07-09T08:34:00Z'),
        direction: 238.9
    },
    {
        timestamp: new Date('2019-07-09T08:35:00Z'),
        direction: 242.7
    },
    {
        timestamp: new Date('2019-07-09T08:36:00Z'),
        direction: 243.7
    },
    {
        timestamp: new Date('2019-07-09T08:37:00Z'),
        direction: 253.6
    },
    {
        timestamp: new Date('2019-07-09T08:38:00Z'),
        direction: 248.6
    },
    {
        timestamp: new Date('2019-07-09T08:39:00Z'),
        direction: 259.2
    },
    {
        timestamp: new Date('2019-07-09T08:40:00Z'),
        direction: 252.5
    },
    {
        timestamp: new Date('2019-07-09T08:41:00Z'),
        direction: 254.9
    },
    {
        timestamp: new Date('2019-07-09T08:42:00Z'),
        direction: 256.6
    },
    {
        timestamp: new Date('2019-07-09T08:43:00Z'),
        direction: 256.2
    },
    {
        timestamp: new Date('2019-07-09T08:44:00Z'),
        direction: 251.4
    },
    {
        timestamp: new Date('2019-07-09T08:45:00Z'),
        direction: 247.3
    },
    {
        timestamp: new Date('2019-07-09T08:46:00Z'),
        direction: 255.5
    },
    {
        timestamp: new Date('2019-07-09T08:47:00Z'),
        direction: 254.4
    },
    {
        timestamp: new Date('2019-07-09T08:48:00Z'),
        direction: 260.4
    },
    {
        timestamp: new Date('2019-07-09T08:49:00Z'),
        direction: 250.6
    },
    {
        timestamp: new Date('2019-07-09T08:50:00Z'),
        direction: 272.6
    },
    {
        timestamp: new Date('2019-07-09T08:51:00Z'),
        direction: 254.4
    },
    {
        timestamp: new Date('2019-07-09T08:52:00Z'),
        direction: 265.5
    },
    {
        timestamp: new Date('2019-07-09T08:53:00Z'),
        direction: 270
    },
    {
        timestamp: new Date('2019-07-09T08:54:00Z'),
        direction: 276.3
    },
    {
        timestamp: new Date('2019-07-09T08:55:00Z'),
        direction: 265.9
    },
    {
        timestamp: new Date('2019-07-09T08:56:00Z'),
        direction: 263.6
    },
    {
        timestamp: new Date('2019-07-09T08:57:00Z'),
        direction: 277.8
    },
    {
        timestamp: new Date('2019-07-09T08:58:00Z'),
        direction: 283.7
    },
    {
        timestamp: new Date('2019-07-09T08:59:00Z'),
        direction: 266.4
    },
    {
        timestamp: new Date('2019-07-09T09:00:00Z'),
        direction: 246.5
    },
    {
        timestamp: new Date('2019-07-09T09:01:00Z'),
        direction: 252.4
    },
    {
        timestamp: new Date('2019-07-09T09:02:00Z'),
        direction: 262.8
    },
    {
        timestamp: new Date('2019-07-09T09:03:00Z'),
        direction: 270.8
    },
    {
        timestamp: new Date('2019-07-09T09:04:00Z'),
        direction: 287.5
    },
    {
        timestamp: new Date('2019-07-09T09:05:00Z'),
        direction: 286.9
    },
    {
        timestamp: new Date('2019-07-09T09:06:00Z'),
        direction: 277.6
    },
    {
        timestamp: new Date('2019-07-09T09:07:00Z'),
        direction: 282
    },
    {
        timestamp: new Date('2019-07-09T09:08:00Z'),
        direction: 270.3
    },
    {
        timestamp: new Date('2019-07-09T09:09:00Z'),
        direction: 273.8
    },
    {
        timestamp: new Date('2019-07-09T09:10:00Z'),
        direction: 271.4
    },
    {
        timestamp: new Date('2019-07-09T09:11:00Z'),
        direction: 257.9
    },
    {
        timestamp: new Date('2019-07-09T09:12:00Z'),
        direction: 257.1
    },
    {
        timestamp: new Date('2019-07-09T09:13:00Z'),
        direction: 249.7
    },
    {
        timestamp: new Date('2019-07-09T09:14:00Z'),
        direction: 253
    },
    {
        timestamp: new Date('2019-07-09T09:15:00Z'),
        direction: 261.3
    },
    {
        timestamp: new Date('2019-07-09T09:16:00Z'),
        direction: 256.2
    },
    {
        timestamp: new Date('2019-07-09T09:17:00Z'),
        direction: 266.1
    },
    {
        timestamp: new Date('2019-07-09T09:18:00Z'),
        direction: 256.9
    },
    {
        timestamp: new Date('2019-07-09T09:19:00Z'),
        direction: 265.8
    },
    {
        timestamp: new Date('2019-07-09T09:20:00Z'),
        direction: 257.9
    },
    {
        timestamp: new Date('2019-07-09T09:21:00Z'),
        direction: 262
    },
    {
        timestamp: new Date('2019-07-09T09:22:00Z'),
        direction: 255
    },
    {
        timestamp: new Date('2019-07-09T09:23:00Z'),
        direction: 245.9
    },
    {
        timestamp: new Date('2019-07-09T09:24:00Z'),
        direction: 249.7
    },
    {
        timestamp: new Date('2019-07-09T09:25:00Z'),
        direction: 261.4
    },
    {
        timestamp: new Date('2019-07-09T09:26:00Z'),
        direction: 264.7
    },
    {
        timestamp: new Date('2019-07-09T09:27:00Z'),
        direction: 272.9
    },
    {
        timestamp: new Date('2019-07-09T09:28:00Z'),
        direction: 264.7
    },
    {
        timestamp: new Date('2019-07-09T09:29:00Z'),
        direction: 241.2
    },
    {
        timestamp: new Date('2019-07-09T09:30:00Z'),
        direction: 245
    },
    {
        timestamp: new Date('2019-07-09T09:31:00Z'),
        direction: 260.6
    },
    {
        timestamp: new Date('2019-07-09T09:32:00Z'),
        direction: 240.2
    },
    {
        timestamp: new Date('2019-07-09T09:33:00Z'),
        direction: 246.2
    },
    {
        timestamp: new Date('2019-07-09T09:34:00Z'),
        direction: 247
    },
    {
        timestamp: new Date('2019-07-09T09:35:00Z'),
        direction: 245.7
    },
    {
        timestamp: new Date('2019-07-09T09:36:00Z'),
        direction: 235
    },
    {
        timestamp: new Date('2019-07-09T09:37:00Z'),
        direction: 258.1
    },
    {
        timestamp: new Date('2019-07-09T09:38:00Z'),
        direction: 255.9
    },
    {
        timestamp: new Date('2019-07-09T09:39:00Z'),
        direction: 244.4
    },
    {
        timestamp: new Date('2019-07-09T09:40:00Z'),
        direction: 268
    },
    {
        timestamp: new Date('2019-07-09T09:41:00Z'),
        direction: 255.7
    },
    {
        timestamp: new Date('2019-07-09T09:42:00Z'),
        direction: 248.1
    },
    {
        timestamp: new Date('2019-07-09T09:43:00Z'),
        direction: 257.2
    },
    {
        timestamp: new Date('2019-07-09T09:44:00Z'),
        direction: 252.9
    },
    {
        timestamp: new Date('2019-07-09T09:45:00Z'),
        direction: 254.8
    },
    {
        timestamp: new Date('2019-07-09T09:46:00Z'),
        direction: 256.8
    },
    {
        timestamp: new Date('2019-07-09T09:47:00Z'),
        direction: 264.6
    },
    {
        timestamp: new Date('2019-07-09T09:48:00Z'),
        direction: 265.1
    },
    {
        timestamp: new Date('2019-07-09T09:49:00Z'),
        direction: 260.4
    },
    {
        timestamp: new Date('2019-07-09T09:50:00Z'),
        direction: 280.4
    },
    {
        timestamp: new Date('2019-07-09T09:51:00Z'),
        direction: 251.5
    },
    {
        timestamp: new Date('2019-07-09T09:52:00Z'),
        direction: 253
    },
    {
        timestamp: new Date('2019-07-09T09:53:00Z'),
        direction: 248.7
    },
    {
        timestamp: new Date('2019-07-09T09:54:00Z'),
        direction: 254.4
    },
    {
        timestamp: new Date('2019-07-09T09:55:00Z'),
        direction: 264
    },
    {
        timestamp: new Date('2019-07-09T09:56:00Z'),
        direction: 252.1
    },
    {
        timestamp: new Date('2019-07-09T09:57:00Z'),
        direction: 263
    },
    {
        timestamp: new Date('2019-07-09T09:58:00Z'),
        direction: 284.9
    },
    {
        timestamp: new Date('2019-07-09T09:59:00Z'),
        direction: 272.3
    },
    {
        timestamp: new Date('2019-07-09T10:00:00Z'),
        direction: 251.2
    }
]

}
