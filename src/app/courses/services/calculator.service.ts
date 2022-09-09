import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {


  constructor(private logger: LoggerService) {

  }

  add(n1: number, n2:number) {
    let result = this.logger.log();
    return result+(n1+n2);
  }

  subtract(n1: number, n2:number) {
    let result = this.logger.log();
    return result+(n1-n2);
  }

  findSquare(num: number){
    return Math.pow(num,2);
  }

}

