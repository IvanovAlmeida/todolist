import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Assignment} from "../../../../../shared/models/assignment.model";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() items: Assignment[] = [];

  @Output() onConcludeEvent: EventEmitter<Assignment> = new EventEmitter<Assignment>();
  @Output() onEditEvent: EventEmitter<Assignment> = new EventEmitter<Assignment>();
  @Output() onDeleteEvent: EventEmitter<Assignment> = new EventEmitter<Assignment>();

  onConclude(data: Assignment): void {
    console.log('onConclude', data);
    this.onConcludeEvent.emit(data);
  }

  onEdit(data: Assignment): void {
    console.log('onEdit', data);
    this.onEditEvent.emit(data);
  }

  onDelete(data: Assignment): void {
    console.log('onDelete', data);
    this.onDeleteEvent.emit(data);
  }
}
