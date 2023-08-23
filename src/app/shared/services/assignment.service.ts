import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {Assignment, AssignmentFilter, PagedResponse} from "src/app/shared/models/assignment.model";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AssignmentService extends BaseService {
  search(filter: AssignmentFilter): Observable<PagedResponse<Assignment>> {
    const url = `${this.apiUrl}/Assignments`;
    const params = new HttpParams({
      fromString: this.parseToQueryString(filter)
    })

    return this.httpClient.get<PagedResponse<Assignment>>(url, {
      params: params
    });
  }

  createTask(task: Assignment): Observable<Assignment> {
    const url = `${this.apiUrl}/Assignments`;
    return this.httpClient.post<Assignment>(url, task);
  }

  parseToQueryString(params: any): string {
    return Object.keys(params).map(key => {
      return `${key}=${encodeURIComponent(params[key])}`;
    }).join('&');
  }
}
