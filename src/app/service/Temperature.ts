import { Injectable } from '@angular/core';

export class Temperature  {
    day: string;
    value: number;
}
export class ScatterData{
    date: string;
    temp: DataScatter[];
    precip :number;
}
export class DataScatter{
    time:string;
    xiang: number;
}
let scatterData: ScatterData[] = [{
    date:"2017-01-01",
    temp:[{
       time : "01:00",
        xiang:10
    },{
       time : "02:00",
        xiang:11
    },{
       time : "03:00",
        xiang:12
    },{
       time : "04:00",
        xiang:13
    },{
       time : "05:00",
        xiang:14
    },{
       time : "06:00",
        xiang:15
    },{
       time : "07:00",
        xiang:16
    },{
       time : "08:00",
        xiang:17
    },{
       time : "09:00",
        xiang:18
    }],
    precip:19
},{
    date:"2017-01-02",
    temp:[{
       time : "01:00",
        xiang:10
    },{
       time : "02:00",
        xiang:11
    },{
       time : "03:00",
        xiang:12
    },{
       time : "04:00",
        xiang:13
    },{
       time : "05:00",
        xiang:14
    },{
       time : "06:00",
        xiang:15
    },{
       time : "07:00",
        xiang:16
    },{
       time : "08:00",
        xiang:17
    },{
       time : "09:00",
        xiang:18
    }],
    precip:0.1
},{
    date:"2017-01-03",
    temp:[{
       time : "01:00",
        xiang:10
    },{
       time : "02:00",
        xiang:11
    },{
       time : "03:00",
        xiang:12
    },{
       time : "04:00",
        xiang:13
    },{
       time : "05:00",
        xiang:14
    },{
       time : "06:00",
        xiang:15
    },{
       time : "07:00",
        xiang:16
    },{
       time : "08:00",
        xiang:17
    },{
       time : "09:00",
        xiang:18
    }],
    precip:0.1
},{
    date:"2017-01-04",
    temp:[{
       time : "01:00",
        xiang:10
    },{
       time : "02:00",
        xiang:11
    },{
       time : "03:00",
        xiang:12
    },{
       time : "04:00",
        xiang:13
    },{
       time : "05:00",
        xiang:14
    },{
       time : "06:00",
        xiang:15
    },{
       time : "07:00",
        xiang:16
    },{
       time : "08:00",
        xiang:17
    },{
       time : "09:00",
        xiang:18
    }],
    precip:0.1
},{
    date:"2017-01-05",
    temp:[{
       time : "01:00",
        xiang:10
    },{
       time : "02:00",
        xiang:11
    },{
       time : "03:00",
        xiang:12
    },{
       time : "04:00",
        xiang:13
    },{
       time : "05:00",
        xiang:14
    },{
       time : "06:00",
        xiang:15
    },{
       time : "07:00",
        xiang:16
    },{
       time : "08:00",
        xiang:17
    },{
       time : "09:00",
        xiang:18
    }],
    precip:0.1
},{
    date:"2017-01-06",
    temp:[{
       time : "01:00",
        xiang:10
    },{
       time : "02:00",
        xiang:11
    },{
       time : "03:00",
        xiang:12
    },{
       time : "04:00",
        xiang:13
    },{
       time : "05:00",
        xiang:14
    },{
       time : "06:00",
        xiang:15
    },{
       time : "07:00",
        xiang:16
    },{
       time : "08:00",
        xiang:17
    },{
       time : "09:00",
        xiang:18
    }],
    precip:0.1
}];

@Injectable()
export class TeamperatureService {

    getWeatherIndicators(): ScatterData[] {
        return scatterData;
    }
}