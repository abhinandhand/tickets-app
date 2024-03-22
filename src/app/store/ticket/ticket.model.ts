export interface ITicket {
  id: number;
  assigneeId: number;
  description: string;
  completed: boolean;
  tempId?: number;
}

export interface IUser {
  id: number;
  name: string;
}
