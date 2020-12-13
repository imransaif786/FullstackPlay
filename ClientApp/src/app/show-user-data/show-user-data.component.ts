import { Component, OnInit } from '@angular/core';
import { UserManageService } from '../Services/user-manage.service';

@Component({
  selector: 'app-show-user-data',
  templateUrl: './show-user-data.component.html',
  styleUrls: ['./show-user-data.component.css']
})
export class ShowUserDataComponent implements OnInit {
  header = ['Id', 'Title', 'First Name', 'Last Name','Email','Gender','']
  userId: any;
  selectedUser: any = {}
  btnSave = "Save"
  constructor(private userService:UserManageService) { }

  ngOnInit() {
    this.getUserList();
  }
  get users() {
    return this.userService.users;
}
getUserList() {
  this.userService.OnGetUser().subscribe((data: any) => {
    this.userService.users = data;
  });
}
onEdit(id) {
  this.userService.getOneUser(id).subscribe(res => {
    this.userId = res.id;
    this.btnSave = 'Updata'
    this.selectedUser = res;
   // this.registerform.patchValue(res)

  })
}
onDelete(id) {
  this.userService.deleteUser(id).subscribe(() => {
    this.getUserList();
  })
}

}