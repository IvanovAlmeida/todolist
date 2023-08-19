import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TasksComponent } from './tasks/tasks.component';


@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
