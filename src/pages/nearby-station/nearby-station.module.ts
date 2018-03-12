import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearbyStationPage } from './nearby-station';

@NgModule({
  declarations: [
    NearbyStationPage,
  ],
  imports: [
    IonicPageModule.forChild(NearbyStationPage),
  ],
})
export class NearbyStationPageModule {}
