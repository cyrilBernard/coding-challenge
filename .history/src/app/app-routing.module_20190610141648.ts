import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from './user/userlist/userlist.component';
import { Routes, RouterModule } from '@angular/router';
import { createComponent } from '@angular/compiler/src/core';
import {CreateComponent} from "../app/user/create/create.component"

const appRoutes: Routes = [
  { path: '', component: UserlistComponent},
  { path: 'createuser', component: CreateComponent},
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
