import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslatePage } from './translate';

@NgModule({
  declarations: [
    TranslatePage,
  ],
  imports: [
    IonicPageModule.forChild(TranslatePage),
  ],
})
export class TranslatePageModule {}
