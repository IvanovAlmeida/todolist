import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {environment} from "../environments/environment";
import {authGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'lists',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/task-list/task-list.module').then(m => m.TaskListModule)
  }
  // { path: '**', component: PageNotFoundComponent } TODO: MAKE THIS
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: environment.isDevelopment()
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
