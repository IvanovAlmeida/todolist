import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Assignment} from "../../models/assignment.model";

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() items: Assignment[] = [];

  @Output() onConcludeEvent: EventEmitter<Assignment> = new EventEmitter<Assignment>();
  @Output() onEditEvent: EventEmitter<Assignment> = new EventEmitter<Assignment>();
  @Output() onDeleteEvent: EventEmitter<Assignment> = new EventEmitter<Assignment>();

  onTaskCreated(task: Assignment): void {
    this.items.unshift(task);
  }

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
