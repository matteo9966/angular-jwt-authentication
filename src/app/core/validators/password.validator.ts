import PasswordValidator from "password-validator";
import _ from 'lodash';
import { ValidatorFn,AbstractControl,ValidationErrors } from "@angular/forms";
const passwordSchema = new PasswordValidator();

passwordSchema.is().min(6)
              .has().uppercase()
              .has().lowercase()
              .has().digits()
              .has().not().spaces()
              .is().not().oneOf(['Passw0rd','Passwrord123','Qwerty123'])

 function validatePassword(password:string){
    return passwordSchema.validate(password,{list:true,details:true})
}


export function validateUserPassword(control:AbstractControl):ValidationErrors|null{
  const value = control.value;
  const errors = <any[]>validatePassword(value);
if(errors && errors.length){
//   validationErrors = errors.map(error=>error.message).join('\r\n');

  const errs:ValidationErrors={
    password:_.keyBy(errors,'validation')
  }
  return errs

}else{
    return null;
}

}
