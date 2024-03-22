import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { TicketActions } from "./ticket.actions";
import { ITicket, IUser } from "./ticket.model";

export const ticketKey = "tickets";

export interface ITicketsState extends EntityState<ITicket> {
  users: IUser[];
  searchValue: string;
  ticketDetails: ITicket;
}

const ticketAdapter: EntityAdapter<ITicket> = createEntityAdapter<ITicket>({
  selectId: (ticket: ITicket) => ticket.id,
});

const initialState: ITicketsState = ticketAdapter.getInitialState({
  users: [],
  searchValue: "",
  ticketDetails: {} as ITicket,
});

export const ticketReducer = createReducer(
  initialState,

  on(TicketActions.loadTicketsSuccess, (state, action) =>
    ticketAdapter.setAll(action.tickets, state)
  ),

  on(TicketActions.loadUsers, (state, { users }) => ({ ...state, users })),

  on(TicketActions.addTicket, (state, action) =>
    ticketAdapter.addOne(action.ticket, state)
  ),

  on(TicketActions.updateTicketEntity, (state, { newEntity, oldId }) =>
    ticketAdapter.mapOne(
      {
        id: oldId,
        map: () => ({
          ...newEntity,
        }),
      },
      state
    )
  ),

  on(TicketActions.completeTicket, (state, action) => {
    const updatedTicket = {
      ...action.ticket,
      completed: true,
    };

    return ticketAdapter.upsertOne(updatedTicket, state);
  }),

  on(TicketActions.assignTicket, (state, { ticket }) => {
    return ticketAdapter.upsertOne(ticket, state);
  }),

  on(TicketActions.searchTickets, (state, { searchValue }) => ({
    ...state,
    searchValue,
  })),

  on(TicketActions.loadTicketDetailsSuccess, (state, { ticket }) => ({
    ...state,
    ticketDetails: ticket,
  }))
);

export const { selectEntities, selectAll } = ticketAdapter.getSelectors();
