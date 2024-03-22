import { Component } from "@angular/core";
import { AddTicketComponent } from "../add-ticket/add-ticket.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { getLoadingState } from "src/app/store/app-config/app-config.selectors";
import { TicketActions } from "src/app/store/ticket/ticket.actions";

@Component({
  selector: "app-tickets-wrapper",
  standalone: true,
  imports: [AddTicketComponent, RouterModule, LoaderComponent, CommonModule],
  templateUrl: "./tickets-wrapper.component.html",
  styleUrl: "./tickets-wrapper.component.css",
})
export class TicketsWrapperComponent {
  isLoading$: Observable<boolean> = this.store.select(getLoadingState);

  constructor(private store: Store) {}

  addNewTicket(ticket) {
    this.store.dispatch(TicketActions.addTicket({ ticket }));
  }
}
