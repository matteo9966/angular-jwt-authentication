import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  NEVER,
  of,
  switchMap,
  throttleTime,
  timeout,
} from 'rxjs';
import { UserService } from '../services/user.service';

export function emailExistsAsyncValidator(
  userService: UserService
): AsyncValidatorFn {
  const asyncValidator: AsyncValidatorFn = (control: AbstractControl) => {
    const email = control.value;

    const values$ = control.valueChanges;

    return values$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((value) => userService.userEmailExists(value)),
      map((exists) => {
        if (exists) {
          return { userExists: true };
        } else {
          return null;
        }
      }),
      first(),
      catchError((err) => {
        return NEVER; // non completa mai e resta in pending
      })
    );

    // return userService.userEmailExists(email).pipe(
    //   throttleTime(2500),
    //   map((exists) => {
    //     if (exists) {
    //       return { userExists: true };
    //     } else {
    //       return null;
    //     }
    //   }),
    //   catchError((err) => {
       
    //     return NEVER; // non completa mai e resta in pending
    //   })
    // );
  };

  return asyncValidator;
}
