import { createReducer, on } from "@ngrx/store";
import { LoaderActions } from "./app-config.actions";

export const appConfigKey = "appConfig";

export interface IAppConfigState {
  isLoading: boolean;
  toaster: boolean;
  notification: boolean;
  sidePanel: boolean;
  loginInfo?: any;
}

export const initialState: IAppConfigState = {
  isLoading: false,
  toaster: false,
  notification: false,
  sidePanel: false,
};

export const appConfigRedcuer = createReducer(
  initialState,

  on(
    LoaderActions.setLoadingState,
    (state, { isLoading }): IAppConfigState => ({
      ...state,
      isLoading: isLoading !== undefined ? isLoading : state.isLoading,
    })
  )
);
