import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUserSignup } from '../core/models/user/user';
import { AuthServiceService } from '../core/services/auth-service.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { UserService } from '../core/services/user.service';
import { confirmPasswordValidator } from '../core/validators/confirm-password.validator';
import { emailExistsAsyncValidator } from '../core/validators/email-exists.asyncValidator';
import {
  validatePassword,
  validateUserPassword,
} from '../core/validators/password.validator';
import _ from 'lodash';
import { signupErrorsMap } from '../core/form-errors/signup-errors';
import { map, share, startWith, tap } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    // private authService: AuthServiceService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router:Router,
  ) {
    this.signupForm = this.formbuilder.group(
      {
        username: this.formbuilder.control('', [Validators.required]),
        password: this.formbuilder.control('', {
          validators: [Validators.required, validateUserPassword],
        }),
        confirmPassword: this.formbuilder.control('', [Validators.required]),
        email: this.formbuilder.control('', {
          validators: [Validators.required, Validators.email],
          asyncValidators: [emailExistsAsyncValidator(userService)],
          updateOn: 'blur',
        }),
        // confirmEmail:this.formbuilder.control('')
      },
      {
        validators: [confirmPasswordValidator()],
      }
    );
  }

  ngOnInit(): void {}

  signUp() {
    //TODO: form validation!!

    console.log(this.signupForm);

    const signupInput = this.signupForm.value as IUserSignup;
    const valid =
      this.signupForm.valid &&
      signupInput.email &&
      signupInput.password &&
      signupInput.email; // come fare un cross validation di password e confirm
    if (!valid) {
      console.log('not valid: signup form', signupInput);
      return;
    }

    this.authenticationService.signup(signupInput).subscribe((user)=>{
      console.log('signup completed:',user);
      this.router.navigateByUrl('/home')
    });

    // this.authService.signup(signupInput).subscribe((response) => {
    //   console.log('signed up completed!!');
    //   console.log(response);
    // });
  }

  get emailControl() {
    return this.signupForm.get('email');
  }
  get passwordcontrol() {
    return this.signupForm.get('password');
  }
  get confirmPassowrdControl() {
    return this.signupForm.get('confirmPassword');
  }
  get usernameControl() {
    return this.signupForm.get('username');
  }

  get formHasConfirmPasswordError() {
    return _.has(this.signupForm.errors, 'confirmPassword');
  }

  showFormControlError() {
    return {
      'valid-confirm-password':
        (this.passwordcontrol?.value || '').length > 0 &&
        (this.confirmPassowrdControl?.value || '').length > 0 &&
        this.passwordcontrol?.value === this.confirmPassowrdControl?.value,
    };
  }

  // get passwordErrors$() {
  //   return this.passwordcontrol!.valueChanges.pipe(
  //     map((password) => {
  //       const errors = validatePassword(password);
  //       return _.keys(_.keyBy(errors, 'validation'));
  //     }),
  //     startWith(['min','lowercase','uppercase','digits']),
  //     share() //devo metterlo?
  //   );
  // }

  mapPassword = (errors: any[]) => {
    return _.keys(_.keyBy(errors, 'validation'));
  };

  get emailExists(){
    if(_.has(this.emailControl?.errors,'userExists')) return true
    return false
    
  }
}
