import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ITicket } from "src/app/store/ticket/ticket.model";
import { selectTicketDetails } from "src/app/store/ticket/ticket.selector";

@Component({
  selector: "app-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrl: "./ticket-details.component.css",
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class TicketDetailsComponent {
  ticketDetails$: Observable<ITicket> = this.store.select(selectTicketDetails);
  constructor(private store: Store) {}
}
