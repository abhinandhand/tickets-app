import { BrowserModule } from "@angular/platform-browser";
import { NgModule, isDevMode } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { AppRoutingModule } from "./app.routing.module";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { AppConfigStoreModule } from "./store/app-config/app-congig.store.module";
import { TicketStoreModule } from "./store/ticket/ticket.store.module";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    StoreRouterConnectingModule.forRoot(),
    AppConfigStoreModule,
    TicketStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
