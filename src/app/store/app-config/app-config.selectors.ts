import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAppConfigState } from "./app-config.reducer";

const selectState = createFeatureSelector<IAppConfigState>("appConfig");

export const getLoadingState = createSelector(
  selectState,
  (state: IAppConfigState) => state.isLoading
);
