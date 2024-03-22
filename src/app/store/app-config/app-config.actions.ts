import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { EToastType } from "src/app/shared/enums/shared.enum";

export const LoaderActions = createActionGroup({
  source: "Loader",
  events: {
    "Set Loading State": props<{ isLoading: boolean }>(),
  },
});

export const ErrorActions = createActionGroup({
  source: "Error",
  events: {
    "Error While Fethcing Data": props<{ message: string }>(),
  },
});

export const ToastActions = createActionGroup({
  source: "Toast",
  events: {
    "Show Toast": props<{ toastType: EToastType; message: string }>(),
  },
});
