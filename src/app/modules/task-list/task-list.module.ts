import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import { ListsComponent } from './lists/lists.component';
import {SharedComponentsModule} from "../../shared/components/shared-components.module";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";


@NgModule({
    declarations: [
        ListsComponent
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        TaskListRoutingModule,
        SharedComponentsModule,
        BsDropdownModule
    ]
})
export class TaskListModule { }
