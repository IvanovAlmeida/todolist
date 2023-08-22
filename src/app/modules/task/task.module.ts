import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import {SharedComponentsModule} from "../../shared/components/shared-components.module";


@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedComponentsModule
  ]
})
export class TaskModule { }
