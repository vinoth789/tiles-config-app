import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigAddComponent } from './config-add/config-add.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'config/add',
    component: ConfigAddComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
