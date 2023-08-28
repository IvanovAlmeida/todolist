import {Component, OnInit} from '@angular/core';
import {DrawerService} from "src/app/shared/layouts/app-layout/subcomponents/drawer/drawer.service";
import {Assignment} from "src/app/shared/models/assignment.model";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {AssignmentUtils} from "../../utils/assignment.utils";

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent implements OnInit {
  data: Assignment = {} as Assignment;
  deadline: Date|undefined = undefined;

  task: Assignment = {} as Assignment;

  get datePickerConfig(): BsDatepickerConfig {
    return {
      adaptivePosition: false, isAnimated: true, showWeekNumbers: true,
      showTodayButton: true, todayButtonLabel: 'Hoje', todayPosition: 'left',
      showClearButton: true, clearButtonLabel: 'Limpar', clearPosition: 'right'
    } as BsDatepickerConfig;
  }

  constructor(private drawerService: DrawerService) {
  }

  ngOnInit(): void {
    this.task = {...this.data};

    if (this.task.deadline) {
      this.deadline = AssignmentUtils.parseDeadlineDate(this.task.deadline);
    }
  }

  onDeadlineChange(): void{
    this.task.deadline = this.deadline?.toJSON() ?? null;
  }

  close(): void {
    this.drawerService.close();
  }

  protected readonly AssignmentUtils = AssignmentUtils;
  protected readonly undefined = undefined;
}
