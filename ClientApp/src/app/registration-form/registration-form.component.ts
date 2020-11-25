import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { MustMatch } from '../custom-validator';





@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registerform: FormGroup
  submitted = false
  readonly ULR =  "https://localhost:5001/api"

  constructor(private fb: FormBuilder,private http: HttpClient) { }
 
  ngOnInit(): void {
    this.registerform = this.fb.group(
      {
        //Id:['0'],
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      { validator: MustMatch('password', 'confirmPassword') }
    );
  }
  get f() {
    return this.registerform.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerform.invalid) {
      return alert("You need a good eye specialist");
    }
    else{
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerform.value, null, 4));
    return this.http.post(this.ULR + "/User",this.registerform.value).subscribe(
      res => {
        this.onReset()
      },
      err =>{
        console.log(err)
      }
    );
    }
  }

  onReset() {
    this.registerform.reset()
    
  }
  

}
