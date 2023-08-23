import {NgModule} from "@angular/core";
import {PageHeaderComponent} from "./page-header/page-header.component";
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {TaskListComponent} from "./task-list/task-list.component";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import { TaskItemFormComponent } from './task-list/subcomponents/task-item-form/task-item-form.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PageHeaderComponent,
    TaskListComponent,
    TaskItemFormComponent
  ],
  imports: [
    NgIf,
    NgClass,
    NgTemplateOutlet,
    NgForOf,
    BsDropdownModule,
    BsDatepickerModule,
    FormsModule
  ],
  exports: [
    PageHeaderComponent,
    TaskListComponent
  ]
})
export class SharedComponentsModule {}
