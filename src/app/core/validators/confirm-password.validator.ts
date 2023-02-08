//è solo una funzione validatorFunction che prende un formGroup come input e restituisce un ValidationErrors o null 

import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import _ from 'lodash';
export function confirmPasswordValidator():ValidatorFn{
   const validatorFn:ValidatorFn = (formGroup:AbstractControl)=>{

    const validationError:ValidationErrors = {confirmPassword:null}
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if(!password || !confirmPassword){
        return null 
        // const errors = (password?'':'no password inserted') + (password?'':', ') + (confirmPassword?null:'no confirm password inserted');

        //  validationError['confirmPassword'] = errors
        //  return _.omitBy(validationError,_.isEmpty)
    }

    if(password===confirmPassword){
        return null
    }
   validationError['confirmPassword'] = `passwords dont correspond!`
   return validationError
    

   }

   return validatorFn
}