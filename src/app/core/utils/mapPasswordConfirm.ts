import { FormControl } from '@angular/forms';
import { IUserSignup } from '../models/user/user';

export const mapPasswordConfirmError =
  (passwordC: FormControl, passwordConfirmC: FormControl) =>
  (value: Partial<IUserSignup & { confirmPassword: string }>) => {
    if(!passwordC || !passwordConfirmC){
        return false;
    }
    if (!passwordC?.touched || !passwordConfirmC?.touched) {
      return false;
    }
    if (
      (passwordConfirmC.value || '').length === 0
    ) {
      return false;
    }
    //length is greater than1
    if (passwordC.value !== passwordConfirmC.value) {
      return true;
    }
    return false;
  };
