import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { MustMatch } from '../custom-validator';
import { User } from '../users';
import { UserManageService } from '../Services/user-manage.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registerform: FormGroup;
  submitted = false
  readonly ULR = "https://localhost:5001/api"

  id : any ;
  userId: any;
  selectedUser: any = {}
  btnSave = "Save"
  header = ['ID', 'Title', 'FirstName', 'LastName','Email']
  constructor(private fb: FormBuilder,
    private userService: UserManageService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  get users() {
    return this.userService.users;
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get("id");
    this.getUserList();
    
    this.onEdit(this.id)
    this.registerform = this.fb.group(
      {
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
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
      if (this.userId && this.userId > 0) {
        const userDataForUpdate = this.registerform.value
        this.userService.update(this.userId, userDataForUpdate).subscribe(() => {
          this.getUserList();
          this.onReset();
        })
      }
      else {
        this.submitted = true;
        if (this.registerform.invalid) {
          return alert("You need a good eye specialist");
        }
        else {
          this.userService.createUser(this.registerform.value).subscribe();
          this.onReset();
        }
      }
    }
    onEdit(id) {
      this.userService.getOneUser(id).subscribe(res => {
        this.userId = res.id;
        this.btnSave = 'Updata'
        this.selectedUser = res;
        this.registerform.patchValue(res)

      })
    }

    getUserList() {
      this.userService.OnGetUser().subscribe((data: any) => {
        this.userService.users = data;
      });
    }
    onReset() {
      this.registerform.reset();
    }
    onDelete(id) {
      this.userService.deleteUser(id).subscribe(() => {
        this.getUserList();
      })
    }
    onBack(): void {
      this.router.navigate(['/']);
    }

  }

