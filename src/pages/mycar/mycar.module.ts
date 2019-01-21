import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycarPage } from './mycar';

@NgModule({
  declarations: [
    MycarPage,
  ],
  imports: [
    IonicPageModule.forChild(MycarPage),
  ],
})
export class MycarPageModule {}
