import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay } from "rxjs/operators";
import { ITicket, IUser } from "./store/ticket/ticket.model";

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */

function randomDelay() {
  return Math.random() * 5000;
}

@Injectable()
export class BackendService {
  storedTickets: ITicket[] = [
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
    {
      id: 2,
      description: "Install LAN connection",
      assigneeId: 222,
      completed: true,
    },
    {
      id: 3,
      description: "Set up the whiteboard",
      assigneeId: 111,
      completed: true,
    },
    {
      id: 4,
      description: "Book the conference room",
      assigneeId: 111,
      completed: false,
    },
  ];

  storedUsers: IUser[] = [
    { id: 111, name: "Victor" },
    { id: 222, name: "Jack" },
    { id: 333, name: "John" },
  ];

  lastId = this.storedTickets[this.storedTickets.length - 1].id || 0;

  private findTicketById = (id) =>
    this.storedTickets.find((ticket) => ticket.id === +id);

  private findUserById = (id) =>
    this.storedUsers.find((user) => user.id === +id);

  tickets() {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<ITicket> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket(payload: { description: string; tempId: number }) {
    const newTicket: ITicket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false,
      tempId: payload.tempId,
    };

    this.storedTickets = this.storedTickets.concat(newTicket);

    return of(newTicket).pipe(delay(randomDelay()));
  }

  assign(ticketId: number, userId: number) {
    return this.update(ticketId, { assigneeId: userId });
  }

  complete(ticketId: number, completed: boolean) {
    return this.update(ticketId, { completed });
  }

  update(ticketId: number, updates: Partial<Omit<ITicket, "id">>) {
    const foundTicket = this.findTicketById(ticketId);

    if (!foundTicket) {
      return throwError(new Error("ticket not found"));
    }

    const updatedTicket = { ...foundTicket, ...updates };

    this.storedTickets = this.storedTickets.map((t) =>
      t.id === ticketId ? updatedTicket : t
    );

    return of(updatedTicket).pipe(delay(randomDelay()));
  }
}
