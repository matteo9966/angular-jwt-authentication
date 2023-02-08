import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

export function emailExistsAsyncValidator(userService:UserService):AsyncValidatorFn{
    const asyncValidator:AsyncValidatorFn = (control:AbstractControl)=>{
        const email = control.value;
        console.log('validating: ',email)
        return userService.userEmailExists(email).pipe(map(exists=>{
            if(exists){
                return {userExists:true}
            }
            else{
                return null
            }
        })) 
    }

    return asyncValidator
}