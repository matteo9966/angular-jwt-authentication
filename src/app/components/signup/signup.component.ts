import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserSignup } from 'src/app/core/models/user/user';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  @Output() formData= new EventEmitter<IUserSignup>()

  constructor(private fb: FormBuilder) {
    this.signupForm = this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    return this.fb.group(
      {
        email: this.fb.control('', [Validators.required, Validators.email], []),
        password: this.fb.control('', [Validators.required]),
        confirmPassword: this.fb.control('', [Validators.required]),
      },
      {
        validators: [], //add crossfield validators here
      }
    );
  }

  signup(event:Event) {
    event.preventDefault();
    this.formData.emit(this.signupForm.value);
  }
}
