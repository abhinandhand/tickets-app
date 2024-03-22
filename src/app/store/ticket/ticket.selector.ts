import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITicketsState } from "./ticket.reducer";
import * as fromTickets from "./ticket.reducer";
import { ITicket } from "./ticket.model";

const selectTicketState = createFeatureSelector<ITicketsState>("tickets");

export const selectAllTickets = createSelector(
  selectTicketState,
  fromTickets.selectAll
);

export const selectUsers = createSelector(
  selectTicketState,
  (state) => state.users
);

export const selectSearchText = createSelector(
  selectTicketState,
  (state) => state.searchValue
);

export const selectTicketDetails = createSelector(
  selectTicketState,
  (state) => state.ticketDetails
);

export const selectFilteredTickets = createSelector(
  selectAllTickets,
  selectSearchText,
  (tickets: ITicket[], searchValue: string) => {
    if (searchValue) {
      return tickets.filter((ticket) => {
        const isDescriptionMatch = ticket.description
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        const isIdMatch = ticket.id.toString() === searchValue;
        const assigneeMatch = ticket.assigneeId.toString() === searchValue;

        return isDescriptionMatch || isIdMatch || assigneeMatch;
      });
    }
    return tickets;
  }
);

export const getNewTicketId = createSelector(
  selectAllTickets,
  (tickets: ITicket[]): number => {
    const previosulyAddedTicket = tickets.reduce((prev, current) => {
      return prev && prev.id > current.id ? prev : current;
    });

    return ++previosulyAddedTicket.id;
  }
);
