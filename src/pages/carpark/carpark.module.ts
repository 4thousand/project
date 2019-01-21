import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarparkPage } from './carpark';

@NgModule({
  declarations: [
    CarparkPage,
  ],
  imports: [
    IonicPageModule.forChild(CarparkPage),
  ],
})
export class CarparkPageModule {}
