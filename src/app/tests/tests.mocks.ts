import { ITicket, IUser } from "../store/ticket/ticket.model";

export const mockTickets: ITicket[] = [
  {
    id: 0,
    description: "Install a monitor arm",
    assigneeId: 111,
    completed: false,
  },
  {
    id: 1,
    description: "Move the desk to the new location",
    assigneeId: 111,
    completed: false,
  },
];

export const mockUsers: IUser[] = [
  { id: 111, name: "Victor" },
  { id: 222, name: "Jack" },
];
