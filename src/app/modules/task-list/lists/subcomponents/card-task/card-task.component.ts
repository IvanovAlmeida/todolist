import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Assignment} from "src/app/shared/models/assignment.model";

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.css']
})
export class CardTaskComponent {
  @Input() task: Assignment = {} as Assignment;

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
