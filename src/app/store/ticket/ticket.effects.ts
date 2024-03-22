import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ROUTER_NAVIGATED } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, concatMap, filter, switchMap, tap } from "rxjs/operators";
import { BackendService } from "src/app/backend.service";
import {
  ErrorActions,
  LoaderActions,
  ToastActions,
} from "../app-config/app-config.actions";
import { TicketActions } from "./ticket.actions";
import { ITicket } from "./ticket.model";
import { EToastType } from "src/app/shared/enums/shared.enum";
import { Router } from "@angular/router";
import { ETicketRoutes } from "src/app/shared/enums/routes.enum";

@Injectable()
export class TicketsEffect {
  loadTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter(() => this.router.url.split("/")[2] === ETicketRoutes.TicketList),
      tap(() =>
        this.store.dispatch(LoaderActions.setLoadingState({ isLoading: true }))
      ),
      switchMap(() =>
        this.backendService.tickets().pipe(
          switchMap((tickets) => {
            return [
              TicketActions.loadTicketsSuccess({ tickets }),
              LoaderActions.setLoadingState({ isLoading: false }),
            ];
          })
        )
      ),
      catchError(() => of(TicketActions.loadTicketsFailure()))
    )
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      switchMap(() =>
        this.backendService.users().pipe(
          switchMap((users) => {
            return [TicketActions.loadUsers({ users })];
          })
        )
      ),
      catchError(() => of(TicketActions.loadUsersFailure()))
    )
  );

  loadTicketsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.loadTicketsFailure),
      switchMap(() => [
        ErrorActions.errorWhileFethcingData({
          message: "Error: Unable to load tickets",
        }),
        LoaderActions.setLoadingState({ isLoading: false }),
      ])
    )
  );

  addNewTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.addTicket),
      concatMap((actionPayLoad) => {
        const preparePayLoad = {
          description: actionPayLoad.ticket.description,
          tempId: actionPayLoad.ticket.id,
        };
        return this.backendService.newTicket(preparePayLoad).pipe(
          switchMap((newEntity) => {
            return [
              TicketActions.addTicketsSuccess(),
              TicketActions.updateTicketEntity({
                newEntity,
                oldId: newEntity.tempId,
              }),
            ];
          })
        );
      }),
      catchError(() => of(TicketActions.addTicketsFailure()))
    )
  );

  addTicketSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.addTicketsSuccess),
      switchMap(() => [
        ToastActions.showToast({
          toastType: EToastType.SUCCESS,
          message: "New ticket added succesfully",
        }),
      ])
    )
  );

  addTicketFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.addTicketsFailure),
      concatMap(() => [
        ToastActions.showToast({
          toastType: EToastType.ERROR,
          message: "Error: Unable to add new ticket",
        }),
        // dispatch action to delete the newly added ticket
      ])
    )
  );

  completeTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.completeTicket),
      concatMap((actionPayLoad) => {
        return this.backendService.complete(actionPayLoad.ticket.id, true).pipe(
          switchMap(() => {
            return [
              TicketActions.completeTicketsSuccess({
                id: actionPayLoad.ticket.id,
              }),
            ];
          })
        );
      }),
      catchError(() => of(TicketActions.completeTicketsFailure()))
    )
  );

  completeTicketSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.completeTicketsSuccess),
      concatMap((payload) => [
        ToastActions.showToast({
          toastType: EToastType.SUCCESS,
          message: `Task ${payload.id} completed`,
        }),
      ])
    )
  );

  completeTicketFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.completeTicketsFailure),
      switchMap(() => [
        ToastActions.showToast({
          toastType: EToastType.ERROR,
          message: "Error: Unable to update the task",
        }),
        // dispatch action to revert the updated ticket in store
      ])
    )
  );

  assignTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.assignTicket),
      concatMap(({ ticket }) => {
        return this.backendService.assign(ticket.id, ticket.assigneeId).pipe(
          switchMap(() => {
            return [
              TicketActions.assignTicketsSuccess({
                userId: ticket.assigneeId,
              }),
            ];
          })
        );
      }),
      catchError(() => of(TicketActions.assignTicketsFailure()))
    )
  );

  assignTicketsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.assignTicketsSuccess),
      switchMap((payload) => [
        ToastActions.showToast({
          toastType: EToastType.SUCCESS,
          message: `Task assigned to user ${payload.userId} `,
        }),
      ])
    )
  );

  assignTicketsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.assignTicketsFailure),
      switchMap(() => [
        ToastActions.showToast({
          toastType: EToastType.ERROR,
          message: "Error: Unable to assign the ticket",
        }),
        // dispatch action to revert the updated ticket in store
      ])
    )
  );

  // For ticket details

  loadTicketDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      filter(
        () => this.router.url.split("/")[2] === ETicketRoutes.TicketDetails
      ),
      tap(() =>
        this.store.dispatch(LoaderActions.setLoadingState({ isLoading: true }))
      ),
      switchMap(() =>
        this.backendService.ticket(+this.router.url.split("/")[3]).pipe(
          switchMap((ticket) => {
            return [
              TicketActions.loadTicketDetailsSuccess({ ticket }),
              LoaderActions.setLoadingState({ isLoading: false }),
            ];
          })
        )
      ),
      catchError(() => of(TicketActions.loadTicketDetailsFailure()))
    )
  );

  loadTicketDetailsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.loadTicketDetailsFailure),
      switchMap(() => [
        ErrorActions.errorWhileFethcingData({
          message: "Error: Unable to fetch ticket details",
        }),
        LoaderActions.setLoadingState({ isLoading: false }),
      ])
    )
  );

  constructor(
    private actions$: Actions,
    private backendService: BackendService,
    private store: Store,
    private router: Router
  ) {}
}
