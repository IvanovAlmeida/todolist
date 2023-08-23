import {NgModule} from "@angular/core";
import {PageHeaderComponent} from "./page-header/page-header.component";
import {NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {TaskListComponent} from "./task-list/task-list.component";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";

@NgModule({
  declarations: [
    PageHeaderComponent,
    TaskListComponent
  ],
  imports: [
    NgIf,
    NgClass,
    NgTemplateOutlet,
    NgForOf,
    BsDropdownModule
  ],
  exports: [
    PageHeaderComponent,
    TaskListComponent
  ]
})
export class SharedComponentsModule {}
