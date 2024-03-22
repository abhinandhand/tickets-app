import { NgModule } from "@angular/core";

import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketsRoutingModule } from "./tickets-routing.module";

@NgModule({
  declarations: [TicketListComponent],
  imports: [TicketsRoutingModule],
  exports: [],
})
export class TicketsModule {}
