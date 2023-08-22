import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
  @Input() iconClass: string = '';
  @Input() title: string = '';
  @Input() description: string = '';

  @Input() showButton: boolean = false;
  @Input() textButton: string = '';
  @Input() iconClassButton: string = '';
  @Output() buttonEvent: EventEmitter<any> = new EventEmitter<any>();

  onClickButton(): void {
    this.buttonEvent.emit();
  }
}
