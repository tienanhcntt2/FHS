import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      configpassword: ['', Validators.required],
      email : ['', Validators.required]
  });
  }

  login(){
    window.location.href = this.EntryPoint;
  }
  register(){
    //window.location.href = this.EntryPoint;
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

  checkRegister(){

  }
  get f(){
    return this.registerForm.controls;
  }
}
