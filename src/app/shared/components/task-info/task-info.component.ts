import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DrawerService} from "src/app/shared/layouts/app-layout/subcomponents/drawer/drawer.service";
import {Assignment} from "src/app/shared/models/assignment.model";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {AssignmentUtils} from "src/app/shared/utils/assignment.utils";
import {DateUtils} from "src/app/shared/utils/date.utils";
import {debounceTime, distinctUntilChanged, filter, fromEvent, tap} from "rxjs";
import {AssignmentService} from "../../services/assignment.service";
import {ToastrService} from "ngx-toastr";

import {ProgressbarConfig} from "ngx-bootstrap/progressbar";

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), { animate: true, striped: true, max: 100, type: 'primary', value: 100 } as ProgressbarConfig);
}

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css'],
  providers: [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }]
})
export class TaskInfoComponent implements OnInit, AfterViewInit {
  data: Assignment = {} as Assignment;
  deadline: Date|undefined = undefined;

  task: Assignment = {} as Assignment;

  onDelete : Function|undefined = undefined;

  loaded = false;
  editing = false;

  @ViewChild('inputDesc', {static: true}) inputDesc!: ElementRef;

  get datePickerConfig(): BsDatepickerConfig {
    return {
      adaptivePosition: false, isAnimated: true, showWeekNumbers: true,
      showTodayButton: true, todayButtonLabel: 'Hoje', todayPosition: 'left',
      showClearButton: true, clearButtonLabel: 'Limpar', clearPosition: 'right'
    } as BsDatepickerConfig;
  }

  constructor(private drawerService: DrawerService, private assignmentService: AssignmentService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.task = {...this.data };

    if (this.task.deadline) {
      this.deadline = DateUtils.parseToDate(this.task.deadline);
    }

    fromEvent(this.inputDesc.nativeElement,'blur')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        tap((text) => {
          console.log(text)
          console.log(this.inputDesc.nativeElement.value)
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.loaded = true;
  }

  onDeadlineChange(): void {
    this.task.deadline = this.deadline ? this.deadline.toJSON() : null;

    if (this.task.deadline === this.data.deadline) {
      return;
    }

    this.editing = true;

    this.assignmentService
      .editTask(this.task.id, this.task)
      .subscribe({
        next: (ret) => {
          this.data = {...ret};
          this.task = {...ret};
        },
        error: err => {
          this.toast.error("Ops, não foi possível alterar Task.");
          this.editing = false;
        },
        complete: () => {
          this.editing = false;
        }
      })
  }

  close(): void {
    this.drawerService.close();
  }

  delete(): void {
    this.editing = true;

    this.assignmentService
      .delete(this.task.id)
      .subscribe({
        next: _ => {
          this.toast.success("Task removida com sucesso.");

          if (this.onDelete) {
            this.onDelete();
          }

          this.drawerService.close();
        },
        error: _ => {
          this.toast.error("Ops, ocorreu um erro ao remover task.");
        },
        complete: () => {
          this.editing = false
        }
      });
  }

  private edit(task: Assignment): void {
    this.editing = true;

    //this.assignmentService.edit(task);
  }

  protected readonly AssignmentUtils = AssignmentUtils;
}
