import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  log() {
    return 'The sum of two numbers is:';
  }

}
