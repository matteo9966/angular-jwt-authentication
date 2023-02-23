import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { IUserSignup } from 'src/app/core/models/user/user';
import { UserService } from 'src/app/core/services/user.service';
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
      map((value: Partial<IUserSignup & { confirmPassword: string }>) => {
        const passwordControl = this.passwordControl;
        const confirmPasswordControl = this.confirmPasswordControl;

        if (!passwordControl?.touched || !confirmPasswordControl?.touched) {
          return false;
        }
        if (
          (<string>passwordControl?.value || '').length === 0 ||
          (<string>confirmPasswordControl?.value || '').length === 0
        ) {
          return false;
        }
        //length is greater than1
        if (
          <string>passwordControl?.value !==
          <string>confirmPasswordControl?.value
        ) {
          return true;
        }
        return false;
      }),
     
    )

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
    return this.signupForm.get('email');
  }
  get passwordControl() {
    return this.signupForm.get('password');
  }
  get confirmPasswordControl() {
    return this.signupForm.get('confirmPassword');
  }
}
