import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ButtonComponent } from "src/app/components/button/button.component";
import { TicketActions } from "src/app/store/ticket/ticket.actions";
import { ITicket, IUser } from "src/app/store/ticket/ticket.model";
import {
  selectFilteredTickets,
  selectUsers,
} from "src/app/store/ticket/ticket.selector";
import { AddTicketComponent } from "../add-ticket/add-ticket.component";
import { SelectUserComponent } from "src/app/components/select-user/select-user.component";
import { Router } from "@angular/router";
import { ETicketRoutes } from "src/app/shared/enums/routes.enum";

@Component({
  selector: "app-ticket-list",
  standalone: true,
  imports: [
    CommonModule,
    AddTicketComponent,
    SelectUserComponent,
    ButtonComponent,
    FormsModule,
  ],
  templateUrl: "./ticket-list.component.html",
  styleUrl: "./ticket-list.component.css",
})
export class TicketListComponent {
  searchValue: string = "";

  filteredTickets$: Observable<ITicket[]> = this.store.select(
    selectFilteredTickets
  );

  users$: Observable<IUser[]> = this.store.select(selectUsers);

  constructor(private store: Store, private router: Router) {}

  onComplete(ticket: ITicket) {
    this.store.dispatch(TicketActions.completeTicket({ ticket }));
  }

  onSearch(value) {
    this.searchValue = value;
    this.store.dispatch(TicketActions.searchTickets({ searchValue: value }));
  }

  onNewAssignee(userId: number, ticket: ITicket) {
    const payload: ITicket = { ...ticket, assigneeId: userId };
    this.store.dispatch(TicketActions.assignTicket({ ticket: payload }));
  }

  navigateToTicketDetails(ticket: ITicket) {
    this.router.navigate([
      ETicketRoutes.TicketHome,
      ETicketRoutes.TicketDetails,
      ticket.id,
    ]);
  }
}
