import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../dataServices/user.service"
import { User } from './../../model/user.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users: User[];
  img: any;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( (us:any) => {
        this.users = us.data;
      });
  }
  addUser(){
    this.router.navigate(["/createuser"]);
  }
  deleteUser(user: User): void {
    this.userService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };

}
