import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Assignment} from "../../models/assignment.model";
import {DeadlineStatusEnum} from "../../enums/deadline-status.enum";
import {AssignmentService} from "../../services/assignment.service";
import {ToastrService} from "ngx-toastr";
import {ProgressbarConfig} from "ngx-bootstrap/progressbar";

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true, max: 100, type: 'primary', value: 100 } as ProgressbarConfig);
}

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }]
})
export class TaskListComponent {
  @Input() items: Assignment[] = [];
  @Output() onEditEvent: EventEmitter<Assignment> = new EventEmitter<Assignment>();

  requestsInProgress: string[] = [];

  constructor(private assignmentService: AssignmentService, private toastr: ToastrService) {
  }

  onTaskCreated(task: Assignment): void {
    this.items.unshift(task);
  }

  deadlineLabel(task: Assignment): string {
    const deadlineStatus = this.getDeadlineStatus(task);
    if (deadlineStatus === DeadlineStatusEnum.None) {
      return '';
    }

    const deadline = this.parseDeadlineDate(task.deadline!);
    switch (deadlineStatus) {
      case DeadlineStatusEnum.Overdue:
        return `Atrasada, ${deadline.toLocaleDateString()}`;
      case DeadlineStatusEnum.Today:
        return `Hoje, ${deadline.toLocaleDateString()}`;
      case DeadlineStatusEnum.Tomorrow:
        return `Amanhã, ${deadline.toLocaleDateString()}`;
      case DeadlineStatusEnum.Future:
      default:
        return `Concluir, ${deadline.toLocaleDateString()}`;
    }
  }

  deadlineLabelClass(task: Assignment): string {
    const deadlineStatus = this.getDeadlineStatus(task);
    switch (deadlineStatus) {
      case DeadlineStatusEnum.Overdue:
        return `deadline-overdue`;
      case DeadlineStatusEnum.Today:
        return `deadline-today`;
      case DeadlineStatusEnum.Tomorrow:
      case DeadlineStatusEnum.Future:
      default:
        return '';
    }
  }

  private getDeadlineStatus(task: Assignment): DeadlineStatusEnum {
    if (!task.deadline) {
      return DeadlineStatusEnum.None;
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const deadline = this.parseDeadlineDate(task.deadline);
    deadline.setHours(0, 0, 0, 0);

    const diffToTomorrow = tomorrow.valueOf() - now.valueOf();

    const duration = deadline.valueOf() - now.valueOf();
    if (duration < 0) {
      return DeadlineStatusEnum.Overdue;
    }

    if (duration === 0) {
      return DeadlineStatusEnum.Today;
    }

    if (duration === diffToTomorrow) {
      return DeadlineStatusEnum.Tomorrow;
    }

    return DeadlineStatusEnum.Future;
  }

  private parseDeadlineDate(deadline: string): Date {
    const date = new Date(deadline);
    const utcTime = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    return new Date(utcTime);
  }


  onCheckboxChange(task: Assignment): void {
    if (this.hasRequestInProgress(task)) {
      return;
    }

    if (task.concluded) {
      this.unconcludeTask(task);
      return;
    }

    this.concludeTask(task);
  }


  private concludeTask(task: Assignment): void {
    this.addToProgress(task);
    this.assignmentService
      .conclude(task.id)
      .subscribe({
        next: _ => {
          task.concluded = true;
          this.toastr.success("Tarefa concluída com sucesso!")
        },
        complete: () => {
          this.removeFromProgress(task);
        }
      });
  }

  private unconcludeTask(task: Assignment): void {
    this.addToProgress(task);
    this.assignmentService
      .unconclude(task.id)
      .subscribe({
        next: _ => {
          task.concluded = false;
          this.toastr.success("Tarefa reaberta com sucesso!")
        },
        complete: () => {
          this.removeFromProgress(task);
        }
      });
  }

  onEdit(data: Assignment): void {
    console.log('onEdit', data);
    this.onEditEvent.emit(data);
  }

  onDelete(task: Assignment): void {
    this.addToProgress(task);
    this.assignmentService
      .delete(task.id)
      .subscribe({
        next: _ => {
          const idx = this.items.findIndex(i => i.id == task.id);
          this.items.splice(idx, 1);
          this.toastr.success("Tarefa excluída com sucesso!");
        },
        complete: () => {
          this.removeFromProgress(task);
        }
      });
  }

  hasRequestInProgress(task: Assignment): boolean {
    return this.requestsInProgress.some(r => r === task.id);
  }

  private addToProgress(task: Assignment): void {
    if (this.hasRequestInProgress(task)) {
      return;
    }

    this.requestsInProgress.push(task.id);
  }

  private removeFromProgress(task: Assignment): void {
    const idx = this.requestsInProgress.findIndex(r => r === task.id);
    this.requestsInProgress.splice(idx, 1);
  }
}
