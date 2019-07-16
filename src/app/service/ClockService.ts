import {Injectable} from "@angular/core";
import {interval, Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClockService {

    private clock: Observable<Date>;

    constructor(private http : HttpClient) { 
      this.clock = interval(1000)
          .pipe(
              map(tick => new Date()),
              share()
          );
    }
  
    getClock(): Observable<Date> {
      return this.clock;
    }

}