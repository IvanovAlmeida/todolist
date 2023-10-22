import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Assignment} from "src/app/shared/models/assignment.model";
import {AssignmentService} from "src/app/shared/services/assignment.service";
import {ToastrService} from "ngx-toastr";
import {ProgressbarConfig} from "ngx-bootstrap/progressbar";
import {DrawerService} from "src/app/shared/layouts/app-layout/subcomponents/drawer/drawer.service";
import {TaskInfoComponent} from "src/app/shared/components/task-info/task-info.component";
import {AssignmentUtils} from "../../utils/assignment.utils";

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true, max: 100, type: 'primary', value: 100 } as ProgressbarConfig);
}

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }]
})
export class TaskListComponent implements OnDestroy {
  @Input() items: Assignment[] = [];
  @Output() onEditEvent: EventEmitter<Assignment> = new EventEmitter<Assignment>();

  requestsInProgress: string[] = [];

  get assignmentUtil(): AssignmentUtils {
    return AssignmentUtils;
  }

  constructor(private assignmentService: AssignmentService,
              private toastr: ToastrService,
              private drawerService: DrawerService) {
  }

  onTaskCreated(task: Assignment): void {
    this.items.unshift(task);
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
    this.drawerService.open(TaskInfoComponent, {
      data: data,
      onDelete: () => {
        this.items = this.items.filter(x => x.id !== data.id);
      }
    });
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

  ngOnDestroy(): void {
    this.drawerService.close();
  }

  protected readonly AssignmentUtils = AssignmentUtils;
}
