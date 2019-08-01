import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, FhsAuthorizeService } from '@fhs/authorize';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  url : URL;
  returnUrl : string;
  message : string;
  submitted : boolean = false;
  user :User;
  erroMessage: boolean = false;
  loading : boolean = false;

  constructor(private formBuilder: FormBuilder,private  router :Router, private auther : FhsAuthorizeService,
    private translateService: TranslateService) { 
      if(localStorage.getItem("language") != null){
        switch(localStorage.getItem("language")){
          case "vi":
            this.colorN = 1;
            break;
            case "en":
                this.colorN = 2;
              break;
              case "zh":
                  this.colorN = 3;
                break;
        }
        this.saveLanguage(localStorage.getItem("language"));
      }else{
        translateService.setDefaultLang('en');
        this.saveLanguage("en");
      }
      
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f(){
    return this.loginForm.controls;
  }
  checkLogin(){
    this.loading = true;
    this.url = new URL('http://10.199.15.95/authorize/connect/authorize');
    this.user = new User();
    this.user.Account =this.f.username.value;
    this.user.Password = this.f.password.value;
     if(this.f.username.value ==='' || this.f.password.value == ''){
       this.submitted = true;
       this.loading = false;
     }else{
       this.submitted = false;

       this.auther.FetchEndpoint(this.url,this.user).subscribe(data =>{
        this.erroMessage = false;
        window.location.href = this.auther.RedirectUri;
    
        this.loading = false;
      },error => {
        this.erroMessage = true;
        this.loading = false;
        this.message =this.translateService.instant("login.txt_message");
        this.loginForm.reset();
        this.f.username.errors;
      });
     }
    
  }
  login(){
    window.location.href = this.EntryPoint;
  }
  register(){
    console.log(this.EntryPoint);
   // window.location.href = this.EntryPoint;
  }
  onSubmit(){    
    this.checkLogin();
  }
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
  colorN : number = 2;
  selectLg1(language: string){
    this.colorN = 1;
    this.translateService.use(language);
    this.saveLanguage(language);
  }
  selectLg2(language: string){
    this.colorN = 2;
    this.translateService.use(language);
    this.saveLanguage(language);
  }
  selectLg3(language: string){
    this.colorN = 3;
    this.translateService.use(language);
    this.saveLanguage(language);
  }
  private saveLanguage(lg: string){
    localStorage.setItem("language",lg);
  }
}
