import {AssignmentList} from "./assignment-list";

export interface Assignment {
  id: string
  description: string
  assignmentListId: string
  deadline: string
  concluded: boolean
  concludedAt: string
  userId: string
  createdAt: string
  updatedAt: string
  assignmentList: AssignmentList
}
