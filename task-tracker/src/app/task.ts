import { Status } from "./status";

export interface Task {
    id : string ;
    name : string;
    description : string;
    status : Status;
    assignedTo: string;
}
