import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-loadding',
  templateUrl: './dialog-loadding.component.html',
  styleUrls: ['./dialog-loadding.component.scss']
})
export class DialogLoaddingComponent implements OnInit {
  public key:number;
  constructor(
    public dialogRef: MatDialogRef<DialogLoaddingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit() {
      this.key = this.data.key;
     
    }
    onNoClick():void{
      this.dialogRef.close();
    }
    login(){
      window.location.href = this.EntryPoint;

      this.dialogRef.close();
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

}
  
  
export interface DialogData {
  animal: string;
  name: string;
  key: number;
}

