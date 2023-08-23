import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {PagedResponse} from "../models/assignment.model";
import {AssignmentList} from "../models/assignment-list";

@Injectable({
  providedIn: 'root'
})
export class AssignmentListService extends BaseService {

  getAllNames(): Observable<PagedResponse<AssignmentList>> {
    const url = `${this.apiUrl}/AssignmentList/names`;
    return this.httpClient.get<PagedResponse<AssignmentList>>(url);
  }
}


