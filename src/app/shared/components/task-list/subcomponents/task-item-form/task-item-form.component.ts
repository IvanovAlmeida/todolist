import {Component, EventEmitter, Output} from '@angular/core';
import {Assignment} from "src/app/shared/models/assignment.model";
import {AssignmentService} from "src/app/shared/services/assignment.service";
import {BsDatepickerConfig, BsLocaleService} from "ngx-bootstrap/datepicker";
import { defineLocale } from 'ngx-bootstrap/chronos';

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

  get datePickerConfig(): BsDatepickerConfig {
    return {
      adaptivePosition: false, isAnimated: true, showWeekNumbers: true,
      showTodayButton: true, todayButtonLabel: 'Hoje', todayPosition: 'left',
      showClearButton: true, clearButtonLabel: 'Limpar', clearPosition: 'right'
    } as BsDatepickerConfig;
  }

  constructor(private assignmentService: AssignmentService) { }

  formIsValid(): boolean {
    return this.newItem.description !== '' && !this.loading;
  }

  createTask(): void {
    if (this.deadline) {
      this.deadline.setHours(23, 59,59, 0);
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
