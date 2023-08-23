import {Component} from '@angular/core';

@Component({
  selector: 'task-item-form',
  templateUrl: './task-item-form.component.html',
  styleUrls: ['./task-item-form.component.css', '../../task-list.component.css']
})
export class TaskItemFormComponent {
  bsValue: Date|undefined = undefined;

  dateLabel = '';

  datePickerConfig = {
    adaptivePosition: false,
    isAnimated: true,
    showClearButton: true,
    clearPosition: 'right',
    containerClass: 'theme-default'
  };

  onDateChange(): void {
    console.log('trocado')
    this.dateLabel = this.bsValue?.toDateString() ?? '';
  }

  protected readonly undefined = undefined;
}
