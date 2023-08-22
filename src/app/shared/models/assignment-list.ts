import {Assignment} from "./assignment.model";

export interface AssignmentList {
  id: string
  name: string
  assignments: Assignment[]
}
