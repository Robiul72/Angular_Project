import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { CreateNewAccountComponent } from './create-new-account/create-new-account.component';

const routes: Routes = [
  {path: "create-new-account", component: CreateNewAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
