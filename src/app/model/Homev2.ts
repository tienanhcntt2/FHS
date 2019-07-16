import { timestamp } from 'rxjs/operators';

export class Homev2{

    public timestamp: string;
    public location: string;
    public windVelocity : number;
    public windDegree: number;
    public humidity : number;
    public temperature: number;
    public atmosphericPressure: number;
    public rainfall: number;
}