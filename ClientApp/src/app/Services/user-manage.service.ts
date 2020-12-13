import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../users';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {
  readonly ULR =  "https://localhost:5001/api"
users : User[]
  constructor(private http:HttpClient) { }

  OnGetUser(){
    return this.http.get(this.ULR+"/User").
     pipe(map((data: User[]) => {return data;}))}

  getOneUser(id){
    return this.http.get<User>(this.ULR + "/user/"+id)
  }
  OnPostData(){
    this.http.post(this.ULR + "/User",User)
  }
  deleteUser(id){
    return this.http.delete(this.ULR + "/user/"+id)
  }
  update(id ,data) {
    return this.http.put(this.ULR +"/user/"+id, data);
  }
  createUser(data){
    return this.http.post(this.ULR + "/User", data);
  }
}