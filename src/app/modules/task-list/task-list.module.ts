import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import { ListsComponent } from './lists/lists.component';
import {SharedComponentsModule} from "../../shared/components/shared-components.module";


@NgModule({
  declarations: [
    ListsComponent
  ],
    imports: [
        CommonModule,
        TaskListRoutingModule,
        SharedComponentsModule
    ]
})
export class TaskListModule { }
