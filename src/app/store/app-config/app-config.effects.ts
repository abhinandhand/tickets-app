import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ErrorActions, ToastActions } from "./app-config.actions";
import { map } from "rxjs/operators";
import * as toastr from "toastr";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AppConfigEffects {
  errorWhileFetchingData$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ErrorActions.errorWhileFethcingData),
        map(({ message }) => this.toastr.error(message))
      ),
    { dispatch: false }
  );

  showToast$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ToastActions.showToast),
        map(({ toastType, message }) => this.toastr[toastType](message))
      ),
    { dispatch: false }
  );

  constructor(private action$: Actions, private toastr: ToastrService) {}
}
