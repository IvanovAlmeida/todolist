import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import { ListsComponent } from './lists/lists.component';


@NgModule({
  declarations: [
    ListsComponent
  ],
  imports: [
    CommonModule,
    TaskListRoutingModule
  ]
})
export class TaskListModule { }
