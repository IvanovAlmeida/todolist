import {NgModule} from "@angular/core";
import {PageHeaderComponent} from "./page-header/page-header.component";
import {NgClass, NgIf} from "@angular/common";

@NgModule({
  declarations: [
    PageHeaderComponent
  ],
  imports: [
    NgIf,
    NgClass
  ],
  exports: [
    PageHeaderComponent
  ]
})
export class SharedComponentsModule {}
