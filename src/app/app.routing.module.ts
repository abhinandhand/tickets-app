import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TicketsRoutingModule } from "./pages/tickets/tickets-routing.module";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ETicketRoutes } from "./shared/enums/routes.enum";

export const routes: Routes = [
  { path: "", redirectTo: ETicketRoutes.TicketHome, pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TicketsRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
