import {AssignmentList} from "./assignment-list";

export interface Assignment {
  id: string;
  description: string;
  assignmentListId: string;
  deadline: string|null;
  concluded: boolean;
  concludedAt: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  assignmentList: AssignmentList;
}

export interface AssignmentFilter extends BasePagination {
  description: string|null;
  startDeadline: string|null;
  endDeadline: string|null;
  concluded: boolean|null;
}

export interface BasePagination {
  orderBy: string;
  orderDir: string;
  page: number;
  perPage: number;
}

export interface PagedResponse<T> extends BasePagination {
  items: T[];
  total: number;
  pageCount: number;
}
