import {Assignment} from "../models/assignment.model";
import {DeadlineStatusEnum} from "../enums/deadline-status.enum";
import {DateUtils} from "./date.utils";

export class AssignmentUtils {
  static deadlineStatusText(task: Assignment): string {
    const deadlineStatus = this.deadlineStatus(task);
    if (deadlineStatus === DeadlineStatusEnum.None) {
      return '';
    }

    const deadline = DateUtils.parseToDate(task.deadline!);
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

  static deadlineStatus(task: Assignment): DeadlineStatusEnum {
    if (!task.deadline) {
      return DeadlineStatusEnum.None;
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const deadline = DateUtils.parseToDate(task.deadline);
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

  static createdStatusText(task: Assignment): string {
    const created = DateUtils.parseToDate(task.createdAt);

    return `Criado em ${created.toLocaleDateString()}`;
  }

  static deadlineLabelClass(task: Assignment): string {
    const deadlineStatus = this.deadlineStatus(task);
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
}
