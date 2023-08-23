import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import {SharedComponentsModule} from "../../shared/components/shared-components.module";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TaskListModule} from "../task-list/task-list.module";
import { TaskItemComponent } from './tasks/subcomponents/task-item/task-item.component';


@NgModule({
  declarations: [
    TasksComponent,
    TaskItemComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedComponentsModule,
    AccordionModule,
    BsDatepickerModule,
    BsDropdownModule,
    TaskListModule
  ]
})
export class TaskModule { }
