import {Component, EventEmitter, Output} from '@angular/core';
import {Assignment} from "src/app/shared/models/assignment.model";
import {AssignmentService} from "../../../../services/assignment.service";

@Component({
  selector: 'task-item-form',
  templateUrl: './task-item-form.component.html',
  styleUrls: ['./task-item-form.component.css', '../../task-list.component.css']
})
export class TaskItemFormComponent {
  newItem: Assignment = { description: '' } as Assignment;
  deadline: Date|undefined = undefined;
  loading: boolean = false;

  @Output()
  taskCreatedEmitter: EventEmitter<Assignment> = new EventEmitter<Assignment>();

  get datePickerConfig(): any {
    return {
      adaptivePosition: false, isAnimated: true, showClearButton: true,
      clearPosition: 'right', containerClass: 'theme-default'
    };
  }

  constructor(private assignmentService: AssignmentService) {
  }

  formIsValid(): boolean {
    return this.newItem.description !== '' || !this.loading;
  }

  createTask(): void {
    if (this.deadline) {
      this.newItem.deadline = this.deadline.toJSON();
    }

    this.loading = true;
    this.assignmentService
      .createTask(this.newItem)
      .subscribe({
        next: task => {
          this.newItem.description = '';
          this.newItem.deadline = null;

          this.loading = false;
          this.taskCreatedEmitter.emit(task);
        },
        error: err => {
          this.loading = false;
          console.log(err);
        }
      });
  }
}
