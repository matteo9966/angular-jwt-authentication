import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';
import { map, Observable } from 'rxjs';
import { PASSWORD_ERRORS } from 'src/app/core/constants/passwordErrors';

@Component({
  selector: 'app-signup-indications',
  templateUrl: './signup-indications.component.html',
  styleUrls: ['./signup-indications.component.scss']
})
export class SignupIndicationsComponent implements OnInit {

  constructor() { }

  @Input() minDigits:number=1;
  @Input() minLength:number=6;
  @Input() uppercase:boolean=true;
  @Input() lowercase:boolean=true;
  // @Input() passwordErrors$:Observable<string[]> = new Observable((subscriber)=>{subscriber.next(PASSWORD_ERRORS)});
  // @Input() passwordS



  

  ngOnInit(): void {
  }

  // get validPassMin$(){
  //   return this.passwordErrors$.pipe(map(errors=>!(_.includes(errors, 'min'))))
  // }
  // get validPassDigits$(){
  //   return this.passwordErrors$.pipe(map(errors=>!(_.includes(errors, 'digits'))))
  // }
  // get validPassLowercase$(){
  //   return this.passwordErrors$.pipe(map(errors=>!(_.includes(errors, 'lowercase'))))
  // }
  // get validPassUppercase$(){
  //   return this.passwordErrors$.pipe(map(errors=>!(_.includes(errors, 'uppercase'))))
  // }

}
