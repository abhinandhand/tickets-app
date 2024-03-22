import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ITicket, IUser } from "./ticket.model";

export const TicketActions = createActionGroup({
  source: "Tickets",
  events: {
    "Load Tickets Success": props<{ tickets: ITicket[] }>(),
    "Load Tickets Failure": emptyProps(),

    "Load Users": props<{ users: IUser[] }>(),
    "Load Users Success": emptyProps(),
    "Load Users Failure": emptyProps(),

    "Add Ticket": props<{ ticket: ITicket }>(),
    "Add Tickets Success": emptyProps(),
    "Add Tickets Failure": emptyProps(),

    "Update Ticket Entity": props<{ newEntity: ITicket; oldId: number }>(),
    "Update Tickets Entity Success": emptyProps(),
    "Update Tickets Entity Failure": emptyProps(),

    "Assign Ticket": props<{ ticket: ITicket }>(),
    "Assign Tickets Success": props<{ userId: number }>(),
    "Assign Tickets Failure": emptyProps(),

    "Complete Ticket": props<{ ticket: ITicket }>(),
    "Complete Tickets Success": props<{ id: number }>(),
    "Complete Tickets Failure": emptyProps(),

    "Search Tickets": props<{ searchValue: string }>(),

    "Load Ticket Details Success": props<{ ticket: ITicket }>(),
    "Load Ticket Details Failure": emptyProps(),
  },
});
