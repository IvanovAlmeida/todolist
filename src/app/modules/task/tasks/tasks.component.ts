import { Component } from '@angular/core';
import {Assignment} from "../../../shared/models/assignment.model";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  items: Assignment[] = [
    {
      id: '1231323',
      description: 'Desc123'
    } as Assignment,
    {
      id: '1231323',
      description: 'Desc123'
    } as Assignment,
    {
      id: '1231323',
      description: 'Desc123'
    } as Assignment,
    {
      id: '1231323',
      description: 'Desc123'
    } as Assignment,
    {
      id: '1231323',
      description: 'Desc123'
    } as Assignment,
    {
      id: '1231323',
      description: 'Desc123'
    } as Assignment
  ];

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
}
