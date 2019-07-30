import { Component, OnInit, Input } from '@angular/core';
import { ListLanguage } from '../model/List_Language';
import { Language } from '../model/Language';

import { environment } from 'src/environments/environment';
import { FhsAuthorizeService } from '@fhs/authorize';
import { UserServicer } from '../service/user.Servicer';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../service/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  public languages = ListLanguage;
  public lag: Language;
  public show: boolean = true;
  private userName: string = "";
  private lg : string ="";
  
  constructor( private userSevice: UserServicer, private auth :FhsAuthorizeService,private translateService: TranslateService,
    private languageService : LanguageService) {
  }

  ngOnInit() {
    this.lg = localStorage.getItem("language");
    for(let i =0; i<this.languages.length;i++){
      if(this.languages[i].title === this.lg.toUpperCase()){
        this.lag = this.languages[i];
      }
    }
    this.translateService.use(this.lg);
    this.inforUserName();
  }
  // function select language
  selectLanguage(i: number) {
    this.lag = this.languages[i];
    this.translateService.use(this.languages[i].title.toLowerCase());
    localStorage.setItem("language",this.languages[i].title.toLowerCase());
  }
  // function logout
  functionlogout() {
    this.userSevice.logout();
  }
  // function check get info
  showNameuser(name : string){
    this.userName = name;
    if(this.userName.length >0 ){
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
        console.log("anhtt :ds " +para);
      });
      this.entrypoint = environment.OIDC.baseUrl + environment.OIDC.authorizationEndpoint + '?' + para.substring(0, para.length - 1);
      
    }

    return this.entrypoint;
  }

  inforUserName(){
    
    if(localStorage.getItem("access_token").length >0){
    
      this.auth.FetchUserEndpoint(new URL(environment.OIDC.urlUser + environment.OIDC.userinfoEndpoint)).subscribe(response => {
        this.userName = response.name;
        this.showNameuser(response.name);
      },error => {
  
      });
    }
    
  }
}
