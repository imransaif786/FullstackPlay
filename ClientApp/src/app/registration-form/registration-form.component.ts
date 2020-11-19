import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MustMatch } from '../custom-validator';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registerform: FormGroup
  submitted = false
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerform = this.fb.group(
      {
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
    },
     {validator: MustMatch('password', 'confirmPassword') }
    );
  }
  get f() {
    return this.registerform.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerform.invalid) {
      return;}
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerform.value, null, 4));
  }
  onReset() {
    this.registerform.reset()
  }
 
}
