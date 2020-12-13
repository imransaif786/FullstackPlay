import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MustMatch } from '../custom-validator';
import { UserManageService } from '../Services/user-manage.service';
import { User } from '../users';

@Component({
  selector: 'app-add-update-user-form',
  templateUrl: './add-update-user-form.component.html',
  styleUrls: ['./add-update-user-form.component.css']
})
export class AddUpdateUserFormComponent implements OnInit {
  registerform: FormGroup;
  submitted = false

  users: User[]
  userId: any;
  selectedUser: any = {}
  btnSave = "Save"
  constructor(private fb: FormBuilder,
              private userService: UserManageService,
  ) { }

  ngOnInit(): void {
    this.getUserList();
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

}
