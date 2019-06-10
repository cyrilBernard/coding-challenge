import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://reqres.in/';
  getUsers() {

    return this.http.get(this.baseUrl + "api/users?page=2");
  }
  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
  loadImg(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }
}
