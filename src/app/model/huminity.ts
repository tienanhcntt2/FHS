import { Injectable } from '@angular/core';

export class HuminityInfo {
    date: string;
    value: number;
}
export class HuminityDescription {
    value: string;
    name: string;
}

let energySources: HuminityDescription[] = [
    { value: "value", name: "Huminity" }

];
let countriesInfo: HuminityInfo[]  = [{
    date: "2019/05/06",
    value: 10
 
}, {
    date: "2019/05/07",
    value: 25
}, {
    date: "2019/05/08",
    value: 35
}, {
    date: "2019/05/09",
    value: 20
}, {
    date: "2019/05/10",
    value: 40
}, {
    date: "2019/05/11",
    value: 65
}];
@Injectable()
export class ServiceHuminity {
    getHuminitySources(): HuminityDescription[] {
        return energySources;
    }
    getHuminityInfo(): HuminityInfo[] {
        return countriesInfo;
    }
}