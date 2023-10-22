import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DrawerOptions, DrawerService} from "./drawer.service";
import {Subscription} from "rxjs";
import {DrawerDirective} from "src/app/shared/directives/drawer.directive";

@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  @ViewChild(DrawerDirective, {static: true}) drawerHost!: DrawerDirective;

  constructor(private drawerService: DrawerService) { }

  ngOnInit(): void {
    this._subscriptions.push(
      this.drawerService.onOpen.subscribe((options: DrawerOptions) => {
        this.openDrawer(options);
      })
    );

    this._subscriptions.push(
      this.drawerService.onUpdate.subscribe((options: DrawerOptions) => {
        this.openDrawer(options);
      })
    );

    this._subscriptions.push(
      this.drawerService.onClose.subscribe(x => {
        this.closeDrawer();
      })
    );
  }

  openDrawer(options: DrawerOptions): void {
    const viewRef = this.drawerHost.viewContainerRef;
    viewRef.clear();

    const componentRef = viewRef.createComponent<any>(options.component);

    Object.keys(options.data).forEach((value, idx) => {
      componentRef.instance[value] = options.data[value];
    });
  }

  closeDrawer(): void {
    this.drawerHost.viewContainerRef.clear();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
