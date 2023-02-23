import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, NEVER, of, timeout } from 'rxjs';
import { UserService } from '../services/user.service';

export function emailExistsAsyncValidator(
  userService: UserService
): AsyncValidatorFn {
  const asyncValidator: AsyncValidatorFn = (control: AbstractControl) => {
    const email = control.value;
    console.log('validating: ', email);
    return userService.userEmailExists(email).pipe(
      map((exists) => {
        if (exists) {
          return { userExists: true };
        } else {
          return null;
        }
      }),
      catchError((err) => {
        console.log('the error got caught')
        return NEVER // non completa mai e resta in pending
      })
    );
  };

  return asyncValidator;
}
