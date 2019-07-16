import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';


export class Weather  {
    month: string;
    avgT: number;
    avgLowT: number;
    avgHighT: number;
    avgH: number;
    prec: number;


}

let weatherData: Weather[] = [{
    month: "2019/06/01",
    avgT: 14.1,
    avgLowT: 9.1,
    avgHighT: 19.1,
    avgH: 70,
    prec: 95
}, {
    month: "2019/06/02",
    avgT: 14.7,
    avgLowT: 9.8,
    avgHighT: 19.6,
    avgH: 74,
    prec: 104
}, {
    month: "2019/06/03",
    avgT: 15.6,
    avgLowT: 10.6,
    avgHighT: 20.4,
    avgH: 35,
    prec: 92
}, {
    month: "2019/06/04",
    avgT: 16.8,
    avgLowT: 11.9,
    avgHighT: 21.7,
    avgH: 80,
    prec: 30
}, {
    month: "2019/06/05",
    avgT: 18.2,
    avgLowT: 13.6,
    avgHighT: 22.7,
    avgH: 83,
    prec: 10
}, {
    month: "2019/06/06",
    avgT: 20.2,
    avgLowT: 15.4,
    avgHighT: 25,
    avgH: 85,
    prec: 20
}, {
    month: "2019/06/07",
    avgT: 22.6,
    avgLowT: 17.3,
    avgHighT: 27.9,
    avgH: 86,
    prec: 50
}, {
    month: "2019/06/08",
    avgT: 23,
    avgLowT: 17.7,
    avgHighT: 28.4,
    avgH: 86,
    prec: 70
}, {
    month: "2019/06/09",
    avgT: 22.3,
    avgLowT: 17,
    avgHighT: 27.7,
    avgH: 83,
    prec: 90
}, {
    month: "2019/06/10",
    avgT: 20.1,
    avgLowT: 14.8,
    avgHighT: 25.3,
    avgH: 79,
    prec: 75
}, {
    month: "2019/06/11",
    avgT: 17.2,
    avgLowT: 11.8,
    avgHighT: 22.7,
    avgH: 72,
    prec: 55
}, {
    month: "2019/06/12",
    avgT: 14.6,
    avgLowT: 9.5,
    avgHighT: 19.7,
    avgH: 68,
    prec: 80
}];
@Injectable()
export class WeatherService {
   
    getWeatherData(): Weather[] {
        return weatherData;
    }
    getDataWeather(countDay: number,day:any,datePipe: DatePipe) : Weather[]{
        let mList : Weather[] =[];
        for(let i = 0;i<countDay;i++){
            let avgT = this.getRandomArbitrary(12,40);
            mList.push({
                month: this.getDate(i,day,datePipe),
                avgT: avgT,
                avgLowT: avgT -5,
                avgHighT: avgT +5,
                avgH :this.getRandomArbitrary(10,90),
                prec :this.getRandomArbitrary(10,500)

            });
        }
        return mList;

    }
    getRandomArbitrary(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    getDate(i : number, day: any,datePipe: DatePipe){
        let date = new Date(day);
        return datePipe.transform(date.setDate(date.getDate() +i));
    }

}