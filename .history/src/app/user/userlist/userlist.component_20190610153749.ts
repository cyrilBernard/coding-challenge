import { Component, OnInit, Inject, Injector, PLATFORM_ID } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../dataServices/user.service"
import { User } from './../../model/user.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users: User[];
  img: any;
  closeResult: string;
  private modalService: NgbModal;
  constructor(private router: Router, private userService: UserService,@Inject(PLATFORM_ID) private platformId: object,private injector:Injector) { 
    if(isPlatformBrowser(this.platformId)){
      this.modalService = this.injector.get(NgbModal);

    }
  }

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
    // localStorage.removeItem("editUserId");
    // localStorage.setItem("editUserId", user.id.toString());
    // this.router.navigate(['edit-user']);
    this.open("content")
  };
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
