import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserSignup } from '../core/models/user/user';
import { AuthServiceService } from '../core/services/auth-service.service';
import { UserService } from '../core/services/user.service';
import { confirmPasswordValidator } from '../core/validators/confirm-password.validator';
import { emailExistsAsyncValidator } from '../core/validators/email-exists.asyncValidator';
import { validateUserPassword } from '../core/validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthServiceService,
    private userService: UserService
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
          updateOn:'blur'
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

    this.authService.signup(signupInput).subscribe((response) => {
      console.log('signed up completed!!');
      console.log(response);
    });
  }
}
