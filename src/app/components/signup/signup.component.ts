import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { IUserSignup } from 'src/app/core/models/user/user';
import { UserService } from 'src/app/core/services/user.service';
import { mapPasswordConfirmError } from 'src/app/core/utils/mapPasswordConfirm';
import { confirmPasswordValidator } from 'src/app/core/validators/confirm-password.validator';
import { emailExistsAsyncValidator } from 'src/app/core/validators/email-exists.asyncValidator';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  showInvalidConfirmError$: Observable<boolean>;
  @Output() formData = new EventEmitter<IUserSignup>();

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signupForm = this.createForm();

    this.showInvalidConfirmError$ = this.signupForm.valueChanges.pipe(
      map(
        mapPasswordConfirmError(
          this.passwordControl,
          this.confirmPasswordControl
        )
      )
    );
  }

  ngOnInit(): void {}

  createForm() {
    return this.fb.group(
      {
        email: this.fb.control(
          '',
          [Validators.required, Validators.email],
          [emailExistsAsyncValidator(this.userService)]
        ),
        password: this.fb.control('', [Validators.required]),
        confirmPassword: this.fb.control('', [Validators.required]),
      },
      {
        validators: [confirmPasswordValidator()], //add crossfield validators here
      }
    );
  }

  signup(event: Event) {
    //tutta la validazione prima del submit
    const signupData: IUserSignup = this.signupForm.value;

    console.log(this.signupForm);

    const valid =
      this.emailControl?.valid &&
      this.passwordControl?.valid &&
      this.confirmPasswordControl?.valid;

    if (!valid) {
      return;
    }

    this.formData.emit(this.signupForm.value);
  }

  get emailControl() {
    return this.signupForm.get('email') as FormControl;
  }
  get passwordControl() {
    return this.signupForm.get('password') as FormControl;
  }
  get confirmPasswordControl() {
    return this.signupForm.get('confirmPassword') as FormControl;
  }

  get disabledSubmit() {
    return !(
      this.emailControl.valid &&
      this.confirmPasswordControl.valid &&
      this.passwordControl.valid &&
      this.signupForm.valid
    );
  }
}
