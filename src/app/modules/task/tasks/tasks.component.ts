import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  items: any[] = [
    {
      id: 1,
      name: 'teste 3'
    },{
      id: 2,
      name: 'teste 3'
    },{
      id: 3,
      name: 'teste 4'
    },{
      id: 4,
      name: 'teste4 '
    },{
      id: 5,
      name: 'testettt'
    },{
      id: 6,
      name: 'testett'
    },
  ];

  onButtonClick(): void {
    console.log('Button novo has clicked')
  }

  onConclude(data: any): void {
    console.log('onConclude', data);
  }

  onEdit(data: any): void {
    console.log('onEdit', data);
  }

  onDelete(data: any): void {
    console.log('onDelete', data);
  }
}
