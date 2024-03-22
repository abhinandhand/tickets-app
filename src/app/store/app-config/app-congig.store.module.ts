import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { appConfigKey, appConfigRedcuer } from "./app-config.reducer";
import { AppConfigEffects } from "./app-config.effects";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(appConfigKey, appConfigRedcuer),
    EffectsModule.forFeature([AppConfigEffects]),
  ],
})
export class AppConfigStoreModule {}
