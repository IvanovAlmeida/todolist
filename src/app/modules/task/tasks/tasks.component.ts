import {Component, OnInit} from '@angular/core';
import {Assignment, AssignmentFilter, PagedResponse} from "src/app/shared/models/assignment.model";
import {AssignmentService} from "src/app/shared/services/assignment.service";
import {map} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private assignmentService: AssignmentService) { }

  items: Assignment[] = [];
  pagedResult: PagedResponse<Assignment> = {} as PagedResponse<Assignment>;

  filter: AssignmentFilter = {
    perPage: 3,
    page: 1
  } as AssignmentFilter;

  ngOnInit(): void {
    this.search();
  }

  private search(more: boolean = false) {
    this.assignmentService.search(this.filter)
      .pipe(map((resp) => {
        resp.items = resp.items.filter(item => {
          return !this.items.some(i => i.id === item.id);
        });

        return resp;
      }))
      .subscribe({
        next: (response) => {
          if (more) {
            this.items.push(...response.items);
          } else {
            this.items = response.items;
          }

          this.pagedResult = response;
        },
        error: (err) => {
          console.error(err);
        }
      })
  }

  onButtonClick(): void {
    console.log('Button novo has clicked')
  }

  onConclude(task: Assignment): void {
    console.log('received onConclude', task);
  }

  onEdit(task: Assignment): void {
    console.log('received onEdit', task);
  }

  onDelete(task: Assignment): void {
    console.log('received onDelete', task);
  }

  hasMorePages(): boolean {
    return this.pagedResult.page < this.pagedResult.pageCount;
  }

  loadMore(): void {
    if (!this.hasMorePages()) {
      return;
    }

    this.filter.page++;
    this.search(true);
  }
}
