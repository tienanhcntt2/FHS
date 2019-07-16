import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isMobile$: Observable<boolean>;
  destory = new Subject();

  constructor(breakpointObserver: BreakpointObserver) {
    this.isMobile$ = breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .pipe(
      map( (match) => match.matches),
      takeUntil(this.destory)
    );
    console.log("anhtt","footer = " +this.isMobile$);
   }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    this.destory.next();
    this.destory.complete();
  }
}
