import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserManageService } from 'src/app/Services/user-manage.service';
import { User } from 'src/app/users';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  registerform1: FormGroup
  submitted = false
  selectedUser: any = {}
  constructor(private route: ActivatedRoute,
    private dataServices: UserManageService) { }


    
  ngOnInit() {
    this.id = this.route.snapshot.params.id
    this.getData();
  }
  get f() {
    return this.registerform1.controls;
  
  }
  getData() {
    this.dataServices.getOneUser(this.id).subscribe(res => {

      // this.data = res
      this.selectedUser = res;
      this.registerform1.patchValue(res)
      console.log(res)
    })

  }
  upDate() {

  }
}
