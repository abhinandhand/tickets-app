import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { ticketKey, ticketReducer } from "./ticket.reducer";
import { EffectsModule } from "@ngrx/effects";
import { TicketsEffect } from "./ticket.effects";

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(ticketKey, ticketReducer),
    EffectsModule.forFeature([TicketsEffect]),
  ],
})
export class TicketStoreModule {}
