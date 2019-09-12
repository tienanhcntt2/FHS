import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ListLanguage } from '../model/List_Language';
import { Language } from '../model/Language';

import { environment } from 'src/environments/environment';
import { FhsAuthorizeService, UserInfoResponse } from '@fhs/authorize';
import { UserServicer } from '../service/user.Servicer';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../service/language.service';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AutherService } from '../service/autherService';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommonService } from '../service/CommonService';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public languages = ListLanguage;
  public lag: Language;
  public show: boolean = true;
  private userName: string = "";
  private lg: string = "";
  private subscription: Subscription;
  constructor(private userSevice: UserServicer, private auth: FhsAuthorizeService, private translateService: TranslateService,
    private languageService: LanguageService, private http: HttpClient, private router:Router, private autherService:AutherService,
    private commoService: CommonService) {
  }

  ngOnInit() {
    this.inforUserName();
    this.lg = localStorage.getItem("language");
    for (let i = 0; i < this.languages.length; i++) {
      if (this.languages[i].title === this.lg.toUpperCase()) {
        this.lag = this.languages[i];
      }
    }
    this.translateService.use(this.lg);
   this.recciverData();
  }
  private recciverData(){
    this.subscription = this.commoService.notifyObservable$.subscribe((res) => {
      if(res.hasOwnProperty("option") && res.option ==='header'){
      
        this.inforUserName();
      }
    });
  }
  // function select language
  selectLanguage(i: number) {
    this.lag = this.languages[i];
    this.translateService.use(this.languages[i].title.toLowerCase());
    localStorage.setItem("language", this.languages[i].title.toLowerCase());
  }
  // function logout
  functionlogout() {
    this.autherService.logOut();
  }
  // function check get info
  showNameuser(name: string) {
    this.userName = name;
    if (this.userName.length > 0) {
      this.show = false;
    }

  }
  // click login
  functionLogin() {
    window.location.href = this.EntryPoint;

  }

  // click login
  private entrypoint: string = '';
  public get EntryPoint(): string {
    if (this.entrypoint.length == 0) {
      let para: string = '';
      Object.keys(environment.OIDC.Paramaters).forEach((k: string) => {

        para += k + '=' + environment.OIDC.Paramaters[k] + '&';

      });
      this.entrypoint = environment.OIDC.baseUrl + environment.OIDC.authorizationEndpoint + '?' + para.substring(0, para.length - 1);

    }

    return this.entrypoint;
  }

  inforUserName() {
    console.log("hello 1 : ");
    if(this.autherService.isUserLoggedIn()){
      this.auth.FetchUserEndpoint(new URL(environment.OIDC.urlUser + environment.OIDC.userinfoEndpoint)).subscribe(response => {
        this.userName = response.name;

        this.showNameuser(response.name);
       
      },error => {
        
      });
    }
  }
  gotoHome(){
    this.router.navigateByUrl("/home");
  }

}
