import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AutherService } from './autherService';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DialogLoaddingComponent } from '../dialog-loadding/dialog-loadding.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private animal: string;
    private  name: string;
    constructor(private autherService: AutherService,public dialog: MatDialog) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                
                this.autherService.logOut();
            } else if(err.status === 304){
                this.openDialog(2)
                //location.reload(true);
            }else if(err.status === 400){
                localStorage.removeItem('token');
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
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