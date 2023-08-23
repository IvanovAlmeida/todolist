import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import {SharedComponentsModule} from "src/app/shared/components/shared-components.module";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";

@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedComponentsModule,
    AccordionModule,
    BsDatepickerModule,
    BsDropdownModule
  ]
})
export class TaskModule { }
