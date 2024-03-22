import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ETicketRoutes } from "src/app/shared/enums/routes.enum";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketDetailsComponent } from "./ticket-details/ticket-details.component";
import { TicketsWrapperComponent } from "./tickets-wrapper/tickets-wrapper.component";

const routes: Routes = [
  {
    path: ETicketRoutes.TicketHome,
    component: TicketsWrapperComponent,
    children: [
      { path: ETicketRoutes.TicketList, component: TicketListComponent },
      { path: "", redirectTo: ETicketRoutes.TicketList, pathMatch: "full" },
      {
        path: `${ETicketRoutes.TicketDetails}/:id`,
        component: TicketDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
